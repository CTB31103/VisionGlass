import { CarDamageLocation } from "@/interfaces";

export const toString = (v: unknown) => JSON.stringify(v, null, 2);

export const leadingZero = (num: number) => (num >= 10 ? `${num}` : `0${num}`);

export const damageInfoString = (
  damageSide: string,
  damageMainLocation: string,
  damageRows: number[],
  includeBr = true,
) => {
  const availableRows = ["1st Row", "2nd Row", "3rd Row", "4th Row"];
  const msg = `${damageSide.length > 0 ? damageSide + " " : ""}${damageMainLocation + `${damageMainLocation.length > 0 ? (damageMainLocation === CarDamageLocation.SIDE ? ` window${damageSide.toLowerCase() === "both" ? "s" : ""} ` : " windshield") : ""}`}${damageRows.length === 1 ? `${includeBr ? "<br/>" : ""} (` + availableRows[damageRows[0] - 1] + ") " : damageRows.length > 1 ? `${includeBr ? "<br/>" : ""} (multiple rows)` : ""}`;
  return `${msg.toLocaleLowerCase()}`;
};
