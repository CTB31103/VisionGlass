import moment from "moment";
import chalk, { Chalk } from "chalk";

const timestamp = () => `[${moment().format("MM/DD/YYYY h:mm A")}]`;

const _log = (...props: any[]) => console.log(...props);

const colorLog = (color: Chalk, ...props: any[]) =>
  console.log(color(timestamp()), color(...props));

const colorSpaceLog = (color: Chalk, ...props: any[]) =>
  console.log(color(timestamp()), color(...props), "\n");

export const Log = {
  json: (obj: any) => JSON.stringify(obj, null, 2),
  log: (...props: any[]) => _log(timestamp(), ...props),
  space: (...props: any[]) => _log(timestamp(), ...props, "\n"),
  colors: {
    green: (...props: any[]) => colorLog(chalk.green, ...props),
    red: (...props: any[]) => colorLog(chalk.red, ...props),
    yellow: (...props: any[]) => colorLog(chalk.yellow, ...props),
    purple: (...props: any[]) => colorLog(chalk.magenta, ...props),
    blue: (...props: any[]) => colorLog(chalk.blue, ...props),

    // with space
    greenSpace: (...props: any[]) => colorSpaceLog(chalk.green, ...props),
    redSpace: (...props: any[]) => colorSpaceLog(chalk.red, ...props),
    yellowSpace: (...props: any[]) => colorSpaceLog(chalk.yellow, ...props),
    purpleSpace: (...props: any[]) => colorSpaceLog(chalk.magenta, ...props),
    blueSpace: (...props: any[]) => colorSpaceLog(chalk.blue, ...props),
  },
};
