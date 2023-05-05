import { toTitleCase } from "./messages";

export const formatString = (
  data,
  caseSensitive: "LOWER" | "UPPER" | "TITLE" | "SENTENCE"
) => {
  switch (caseSensitive) {
    case "LOWER":
      return data.toLocaleLowerCase();
    case "UPPER":
      return data.toLocaleUpperCase();
    case "TITLE":
      return toTitleCase(data);
    case "SENTENCE":
      return firstLetterUpper(data);

    default:
      return data;
  }
};
export const capSentence = (text) => {
  const wordsArray = text.toLowerCase().split(" ");
  const capsArray = wordsArray.map((word) => {
    return word[0].toLowerCase() + word.slice(1);
  });
  capsArray[0] = capsArray[0].split("")[0].toUpperCase();
  return capsArray.join(" ");
};

export const firstLetterUpper = (theString) => {
  const newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
  return newString;
};
