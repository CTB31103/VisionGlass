import UserControllerValidators from "./userControllerValidators";
import { TokenValidators } from "./tokenValidators";
import { MediaValidators } from "./mediaValidators";
import { ChatValidators } from "./chatValidators";
import { CalendarEventValidators } from "./calendarEventValidators";
import { CustomerQuoteValidators } from "./customerQuoteValidators";
import { ReviewControllerValidators } from "./reviewValidators";
import { PaginationValidation } from "./paginationValidation";
export * from "./validate";

const Validators = {
  TokenValidators,
  UserControllerValidators,
  MediaValidators,
  ChatValidators,
  CalendarEventValidators,
  CustomerQuoteValidators,
  ReviewControllerValidators,
  PaginationValidation,
};

export default Validators;
