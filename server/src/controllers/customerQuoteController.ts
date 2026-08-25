import { ICustomerQuote } from "../interfaces";
import { CustomerQuote, CustomerQuoteModel, MongoDoc } from "../models";
import { HashUtils, Log, TryCatch } from "../utils";
import Validators from "../validators";
import { RULES, validationV2 } from "../validators/validate";
import ControllerFunc from "./controllerFunc";

const getQuotes = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      Validators.TokenValidators.resLocalsTokenValues(res.locals);
      const { validData: validQueryData } = validationV2<{ query?: string }>(
        { query: [RULES.common.optionalString, ""] },
        req.query,
      );

      let databaseQuery: any = {};

      if (validQueryData?.query) {
        const regexQuery = { $regex: validQueryData.query, $options: "i" };
        databaseQuery = {
          $or: [
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
          ],
        };

        if (!Number.isNaN(parseInt(validQueryData.query))) {
          (databaseQuery["$or"] as unknown[]).push({
            "car.year": validQueryData.query,
          });
        }
      }

      const customerQuotes = (await CustomerQuoteModel.find(databaseQuery)).map(
        (q) => q.toCustomerQuote(),
      );

      res.send({ customerQuotes });
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
