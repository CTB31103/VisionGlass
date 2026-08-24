import { ICustomerQuote } from "../interfaces";
import { CustomerQuote, CustomerQuoteModel, MongoDoc } from "../models";
import { HashUtils, Log, TryCatch } from "../utils";
import Validators from "../validators";
import ControllerFunc from "./controllerFunc";

const create = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
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
        teamMembers: [],
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

      // Log.colors.yellow(Log.json(customerQuote.toCustomerQuote()));
      // Log.log(``);

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
};
