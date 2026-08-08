import { CSS } from "@/Constants";
import type { ButtonColor } from "./types";

export const buttonColorCSS = (color: ButtonColor) =>
  color === "blue"
    ? CSS.colors.blue
    : color === "red"
      ? "red"
      : color === "white"
        ? CSS.colors.white
        : undefined;

export const buttonTextColorCSS = (color: ButtonColor) =>
  color === "white" ? CSS.colors.blue : undefined;

export const buttonBorderColorCSS = (_color: ButtonColor = "none") =>
  CSS.hex.black;
