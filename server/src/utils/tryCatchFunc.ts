import { Log } from ".";

export const TryCatch = async (
  tryFunc: (() => void) | (() => Promise<void>),
  catchFunc: ((err?: string) => void) | ((err?: string) => Promise<void>),
  errorPrefix?: string,
) => {
  try {
    await tryFunc();
  } catch (e: any) {
    Log.colors.red(`${errorPrefix ? errorPrefix + " " : ""}Error`);
    Log.colors.yellow(e.message);
    await catchFunc(e.message);
  }
};
