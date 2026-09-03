export const toString = (v: unknown) => JSON.stringify(v, null, 2);

export const leadingZero = (num: number) => (num >= 10 ? `${num}` : `0${num}`);
