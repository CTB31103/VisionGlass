import { CSS } from "@/Constants";
import type { ICustomerQuote } from "@/interfaces";

export const quoteStatusToColor = (status: ICustomerQuote["status"]) =>
  status === "new"
    ? CSS.colors.red
    : status === "done"
      ? CSS.colors.blue
      : CSS.colors.darkGrey;
