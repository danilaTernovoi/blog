enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const formatDate = (dateString: string): string => {
  const dateInstance = new Date(dateString);

  const res = `${
    Months[dateInstance.getMonth()]
  } ${dateInstance.getDate()}, ${dateInstance.getFullYear()}`;

  return res;
};

export const capitalize = (value: string) =>
  value
    .split(" ")
    .reduce((total, word) => {
      const upper = word.charAt(0).toUpperCase() + word.slice(1);
      const res = total + upper + " ";
      return res;
    }, "")
    .trim();

export const upperFirstLetter = (value: string) => {
  const [first, ...other] = value.split(" ");
  const upper = first.charAt(0).toUpperCase() + first.slice(1);
  return `${upper} ${other.join(" ")}`;
};

export {};
