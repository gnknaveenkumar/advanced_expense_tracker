const today = new Date();

export const getFormattedDateAndDay = (): string => {
  const day = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();
  const date = today.getDate().toString().padStart(2, "0");
  return `${date}  ${day} `;
};

export const getFormattedMonth = (): string => {
  const day = today;
  const month = today
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return month;
};
