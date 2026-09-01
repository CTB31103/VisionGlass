export const capitalize = (word: string) =>
  word.length > 0 ? `${word[0].toLocaleUpperCase()}${word.slice(1)}` : "";
