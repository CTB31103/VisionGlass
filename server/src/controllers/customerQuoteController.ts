import moment from "moment";
import { CustomerQuoteStatus, ICustomerQuote } from "../interfaces";
import { CustomerQuote, CustomerQuoteModel, RootFilterQuery } from "../models";
import { HashUtils, Log, toMidnight, TryCatch } from "../utils";
import Validators from "../validators";
import { RULES, validationV2 } from "../validators/validate";
import ControllerFunc from "./controllerFunc";

const getQuotes = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      Validators.TokenValidators.resLocalsTokenValues(res.locals);
      const { validData: validQueryData, errorMsg } = validationV2<{
        query?: string;
        pageLimit?: string;
        pageNumber?: string;
        status?: string;
        employee?: string;
        scheduledDate?: string;
      }>(
        {
          query: [RULES.common.optionalString, ""],
          pageLimit: [RULES.common.optionalString, ""],
          pageNumber: [RULES.common.optionalString, ""],
          status: [RULES.common.optionalString, ""],
          employee: [RULES.common.optionalString, ""],
          scheduledDate: [RULES.common.optionalString, ""],
        },
        req.query,
      );

      const pageNumber = validQueryData?.pageNumber
        ? parseInt(validQueryData.pageNumber)
        : 1;
      const pageLimit = validQueryData?.pageLimit
        ? parseInt(validQueryData.pageLimit)
        : 4;

      let databaseQuery: RootFilterQuery<ICustomerQuote> = {
        $and: [],
      };

      if (validQueryData?.query) {
        const regexQuery = { $regex: validQueryData.query, $options: "i" };
        const queryOr: RootFilterQuery<ICustomerQuote>["$or"] = [
          {
            "customer.firstName": regexQuery,
          },
          {
            "customer.lastName": regexQuery,
          },
          {
            "customer.email": regexQuery,
          },
          {
            "customer.phone": regexQuery,
          },
          {
            "car.make": regexQuery,
          },
          {
            "car.model": regexQuery,
          },
          {
            "paymentInfo.insurance.insuranceName": regexQuery,
          },
          {
            "paymentInfo.insurance.policyNumber": regexQuery,
          },
        ];

        if (!Number.isNaN(parseInt(validQueryData.query))) {
          queryOr.push({
            "car.year": parseInt(validQueryData.query),
          });
        }

        databaseQuery.$and!.push({ $or: queryOr });
      }

      if (validQueryData?.status) {
        const statusOr: RootFilterQuery<ICustomerQuote> = {
          status: validQueryData.status as CustomerQuoteStatus,
        };

        databaseQuery.$and!.push(statusOr);
      }

      if (validQueryData?.employee) {
        const employeeOr: RootFilterQuery<ICustomerQuote> = {
          teamMembers: validQueryData.employee,
        };

        databaseQuery.$and!.push(employeeOr);
      }

      if (
        validQueryData?.scheduledDate &&
        !Number.isNaN(parseInt(validQueryData.scheduledDate))
      ) {
        const midnight = toMidnight(
          moment(new Date(parseInt(validQueryData.scheduledDate))),
        );
        const nextDay = moment(midnight).add(1, "day").toDate();
        const dateOr: RootFilterQuery<ICustomerQuote> = {
          $and: [
            {
              "meetingTime.from": { $gte: midnight.getTime() },
            },
            {
              "meetingTime.from": { $lte: nextDay.getTime() },
            },
          ],
        };

        databaseQuery.$and!.push(dateOr);
      }

      const customerQuotesPaginationResult = await CustomerQuoteModel.paginate(
        databaseQuery,
        {
          limit: pageLimit,
          page: pageNumber,
        },
      );

      const customerQuotes = customerQuotesPaginationResult.docs.map((doc) =>
        doc.toCustomerQuote(),
      );

      res.send({
        customerQuotes,
        page: customerQuotesPaginationResult.page ?? pageNumber,
        pageLimit: customerQuotesPaginationResult.limit,
        total: customerQuotesPaginationResult.totalDocs,
        totalPages: customerQuotesPaginationResult.totalPages,
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const create = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const {
        customer,
        carInfo,
        damageInfo,
        address,
        paymentInfo,
        callbackTime,
        meetingTime,
      } = Validators.CustomerQuoteValidators.create(req.body);

      const customerQuoteData: ICustomerQuote = {
        customerQuoteId: HashUtils.uniqueId(),
        teamMembers: [userId],
        status:
          meetingTime !== undefined
            ? "scheduled"
            : (paymentInfo?.insurance?.coverageAmount ?? 0) > 0
              ? "insurance_validated"
              : "new",
        customer,
        car: carInfo,
        damage: damageInfo,
        address,
        paymentInfo: paymentInfo,
        callbackTime: callbackTime,
        meetingTime: meetingTime,
      };

      const customerQuote: CustomerQuote = (
        await CustomerQuoteModel.create([customerQuoteData], {})
      )[0].toCustomerQuote();

      res.send({
        customerQuote,
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

export const CustomerQuoteController = {
  create,
  getQuotes,
};
