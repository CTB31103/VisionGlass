import moment from "moment";
import {
  CustomerQuoteStatus,
  ICustomerQuote,
  IServiceType,
} from "../interfaces";
import {
  AttatchmentModel,
  CustomerQuote,
  CustomerQuoteModel,
  RootFilterQuery,
} from "../models";
import {
  ConditionalUtils,
  HashUtils,
  ImageUtils,
  Log,
  SessionController,
  toMidnight,
  TryCatch,
} from "../utils";
import Validators from "../validators";
import { RULES, validationV2 } from "../validators/validate";
import ControllerFunc from "./controllerFunc";
import CONSTANTS from "../constants";
import { produce } from "immer";

const getQuotes = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      Validators.TokenValidators.resLocalsTokenValues(res.locals);
      const { validData: validQueryData, errorMsg } = validationV2<{
        query?: string;

        status?: string[] | string;
        employee?: string;
        scheduledDate?: string;
      }>(
        {
          query: [RULES.common.optionalString, ""],

          status: [
            Array.isArray(req.query["status"])
              ? RULES.common.optionalArray
              : RULES.common.optionalString,
            "",
          ],
          employee: [RULES.common.optionalString, ""],
          scheduledDate: [RULES.common.optionalString, ""],
        },
        req.query,
      );

      const { pageLimit, pageNumber } =
        Validators.PaginationValidation.getPaginatedQuery(req.query);

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
          $or: (typeof validQueryData.status === "string"
            ? [validQueryData.status]
            : validQueryData.status
          ).map((status) => ({
            status: status as CustomerQuoteStatus,
          })),
        };
        databaseQuery.$and!.push(statusOr);

        // validQueryData.status.forEach((status) =>
        //   databaseQuery.$and!.push({
        //     status: status as CustomerQuoteStatus,
        //   }),
        // );
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
        notes,
        serviceType,
      } = Validators.CustomerQuoteValidators.create(req.body);

      const customerQuoteData: ICustomerQuote = {
        serviceType: serviceType as IServiceType,
        customerQuoteId: HashUtils.uniqueId(),
        teamMembers: [userId],
        attatchments: [],
        status:
          meetingTime !== undefined
            ? "scheduled"
            : (paymentInfo?.insurance?.coverageAmount ?? 0) > 0
              ? "insurance_validated"
              : (paymentInfo?.serviceAmount ?? 0) > 0
                ? "quoted"
                : "new",
        customer,
        car: carInfo,
        damage: damageInfo,
        address,
        paymentInfo: paymentInfo,
        callbackTime: callbackTime,
        meetingTime: meetingTime,
        createdOn: new Date().getTime(),
        notes,
      };

      const customerQuote: CustomerQuote = (
        await CustomerQuoteModel.create([customerQuoteData], {})
      )[0].toCustomerQuote();

      res.send({
        customer: customerQuote,
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const getQuote = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { validData, errorMsg } = validationV2<{ customerQuoteId: string }>(
        { customerQuoteId: [RULES.common.requiredString, ""] },
        req.params,
      );
      if (errorMsg || !validData) throw new Error(errorMsg);

      const { customerQuoteId } = validData;

      const quote = await CustomerQuoteModel.findOne({ customerQuoteId });

      if (!quote) throw new Error(`Could not find customer`);

      res.send({ customer: quote.toCustomerQuote() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const edit = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { customerQuoteId: paramCustomerQuoteId } =
        Validators.CustomerQuoteValidators.customerQuoteId(req.params);
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const {
        status,
        customerQuoteId,
        customer,
        carInfo,
        damageInfo,
        address,
        paymentInfo,
        callbackTime,
        meetingTime,
        notes,
        serviceType,

        forceStatus,
      } = Validators.CustomerQuoteValidators.edit(req.body);

      if (paramCustomerQuoteId !== customerQuoteId)
        throw new Error(`Customer ID mismatch.`);

      const ogQuote = await CustomerQuoteModel.findOne({ customerQuoteId });
      if (!ogQuote) throw new Error(`Customer could not be found.`);

      const teamMembers = [...ogQuote.teamMembers];
      if (!teamMembers.includes(userId)) teamMembers.push(userId);

      // Auto infer status from fields
      const customerQuoteData: ICustomerQuote = {
        serviceType: serviceType as IServiceType,
        customerQuoteId,
        teamMembers,
        attatchments: ogQuote.attatchments,
        status: forceStatus
          ? (status as CustomerQuoteStatus)
          : meetingTime !== undefined
            ? "scheduled"
            : (paymentInfo?.insurance?.coverageAmount ?? 0) > 0
              ? "insurance_validated"
              : (paymentInfo?.serviceAmount ?? 0) > 0
                ? "quoted"
                : "new",
        customer,
        car: carInfo,
        damage: damageInfo,
        address,
        paymentInfo: paymentInfo,
        callbackTime: callbackTime,
        meetingTime: meetingTime,
        notes,
        createdOn: ogQuote.createdOn,
      };

      const customerQuote = await CustomerQuoteModel.findOneAndUpdate(
        { customerQuoteId },
        customerQuoteData,
        { returnDocument: "after" },
      );
      if (!customerQuote) throw new Error(`Could not edit customer.`);

      res.send({ customer: customerQuote.toCustomerQuote() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const editStatus = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { customerQuoteId: paramCustomerQuoteId } =
        Validators.CustomerQuoteValidators.customerQuoteId(req.params);
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const { customerQuoteId, status } =
        Validators.CustomerQuoteValidators.editStatus(req.body);

      if (paramCustomerQuoteId !== customerQuoteId)
        throw new Error(`Customer ID mismatch.`);

      const ogQuote = await CustomerQuoteModel.findOne({ customerQuoteId });
      if (!ogQuote) throw new Error(`Customer could not be found.`);

      const teamMembers = [...ogQuote.teamMembers];
      if (!teamMembers.includes(userId)) teamMembers.push(userId);

      ogQuote.status = status as CustomerQuoteStatus;
      ogQuote.teamMembers = teamMembers;

      await ogQuote.save();

      res.send({ customer: ogQuote.toCustomerQuote() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const toggleTeamMember = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId, customerQuoteId } =
        Validators.CustomerQuoteValidators.toggleTeamMember(req.body);

      const ogCustomer = await CustomerQuoteModel.findOne({ customerQuoteId });
      if (!ogCustomer) throw new Error(`Could not find customer.`);

      let teamMembers = [...ogCustomer.teamMembers];

      if (teamMembers.includes(userId))
        teamMembers = teamMembers.filter((mem) => mem !== userId);
      else teamMembers.push(userId);

      ogCustomer.teamMembers = teamMembers;
      await ogCustomer.save();

      res.send({ customer: ogCustomer.toCustomerQuote() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const toggleAttatchments = ControllerFunc((req, res) =>
  SessionController(
    async ({ session }) =>
      await TryCatch(
        async () => {
          const { customerQuoteId } =
            Validators.CustomerQuoteValidators.customerQuoteId(req.params);
          const { validData, errorMsg } = validationV2<{
            attatchmentIds: string[];
            deleteAttatchment?: boolean;
          }>(
            {
              attatchmentIds: [
                RULES.multiple(RULES.min(1), RULES.common.requiredArray),
                "attatchments",
              ],
              deleteAttatchment: [RULES.common.optionalBool, ""],
            },
            req.body,
          );
          if (errorMsg || !validData) throw new Error(errorMsg);

          const ogQuote = await CustomerQuoteModel.findOne({
            customerQuoteId,
          }).session(session);
          if (!ogQuote) throw new Error(`Could not find customer.`);

          const addingIds: string[] = [];
          const removingIds: string[] = [];

          validData.attatchmentIds.forEach((id) =>
            ogQuote.attatchments.includes(id)
              ? removingIds.push(id)
              : addingIds.push(id),
          );

          if (removingIds.length > 0 && Boolean(validData.deleteAttatchment)) {
            const diskFolder = ImageUtils.getUploadsFolder();

            Log.colors.yellow(`Removing:`);
            Log.colors.yellow(Log.json(removingIds));
            Log.colors.yellow(``);

            await Promise.all(
              removingIds.map(
                async (id) =>
                  await ImageUtils.deleteFile(ImageUtils.join(diskFolder, id)),
              ),
            );

            await AttatchmentModel.deleteMany(
              { attachmentId: { $in: removingIds } },
              { session },
            );
          }

          ogQuote.attatchments = produce(ogQuote.attatchments, (draft) => {
            return draft
              .filter((ogId) => !removingIds.includes(ogId))
              .concat(addingIds);
          });

          await ogQuote.save({ session });

          res.send({ customer: ogQuote.toCustomerQuote() });
        },
        (err) => {
          res.status(500).json({ error: err });
        },
      ),
  ),
);

export const CustomerQuoteController = {
  create,
  getQuotes,
  getQuote,
  edit,
  editStatus,
  toggleTeamMember,
  toggleAttatchments,
};
