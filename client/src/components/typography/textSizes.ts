// import { SMALL_TEXT_SIZES } from './textSizes';
export const TEXT_SIZES = {
  smaller: 12,
  small: 16,
  medium1: 20,
  medium2: 24,
  large: 32,
  largest: 56,
};

const XSM = 0.6;
const SM = 0.85;
const MD = 0.95;

export const XSMALL_TEXT_SIZES = {
  smaller: Math.round(TEXT_SIZES.smaller * SM),
  small: Math.round(TEXT_SIZES.small * SM),
  medium1: Math.round(TEXT_SIZES.medium1 * SM),
  medium2: Math.round(TEXT_SIZES.medium2 * SM),
  large: Math.round(TEXT_SIZES.large * 0.75),
  largest: Math.round(TEXT_SIZES.largest * XSM),
};

export const SMALL_TEXT_SIZES = {
  smaller: Math.round(TEXT_SIZES.smaller * SM),
  small: Math.round(TEXT_SIZES.small * SM),
  medium1: Math.round(TEXT_SIZES.medium1 * SM),
  medium2: Math.round(TEXT_SIZES.medium2 * SM),
  large: Math.round(TEXT_SIZES.large * SM),
  largest: Math.round(TEXT_SIZES.largest * 0.75),
};

export const MEDIUM_TEXT_STYLES = {
  smaller: Math.round(TEXT_SIZES.smaller * MD),
  small: Math.round(TEXT_SIZES.small * MD),
  medium1: Math.round(TEXT_SIZES.medium1 * MD),
  medium2: Math.round(TEXT_SIZES.medium2 * MD),
  large: Math.round(TEXT_SIZES.large * MD),
  largest: Math.round(TEXT_SIZES.largest * MD),
};
