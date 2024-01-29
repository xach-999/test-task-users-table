export function getFormat(date: Date) {
  const inputDate = new Date(date);

  const options: any = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const outputDateString = inputDate
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, ".");

  return outputDateString;
}

export function formatDateRussian(date: number) {
  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];
  const newDate = new Date(date);
  const day = String(newDate.getDate()).padStart(2, "0");
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
}
