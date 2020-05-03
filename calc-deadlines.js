const YEAR = new Date().getFullYear();
const WEEKENDS = [6, 0];
const memorialDay = () => {
  const memDay = new Date(YEAR, 4, 5).getTime();
  const memDayYears = [0, 5];
  const lastDigitYear = YEAR.toString().slice(-1);
  if (memDayYears.includes(+lastDigitYear)) return memDay;
  return null;
};
const OFFICIAL_HOLIDAYS = [
  new Date(YEAR, 0, 1).getTime(),
  new Date(YEAR, 3, 12).getTime(),
  new Date(YEAR, 3, 13).getTime(),
  new Date(YEAR, 3, 27).getTime(),
  memorialDay(), // 5th of may every 5 years
  new Date(YEAR, 4, 21).getTime(),
  new Date(YEAR, 4, 31).getTime(),
  new Date(YEAR, 5, 1).getTime(),
  new Date(YEAR, 11, 25).getTime(),
  new Date(YEAR, 11, 26).getTime(),
];

// @TODO timezones...
const calcDeadline = (startDate, days) => {
  let count = 0;
  while (count < days) {
    startDate.setDate(startDate.getDate() + 1);
    const dateExcludingTime = new Date(startDate.setHours(0, 0, 0, 0));
    if (
      !WEEKENDS.includes(dateExcludingTime.getDay()) &&
      !OFFICIAL_HOLIDAYS.includes(dateExcludingTime.getTime())
    )
      count++;
  }
  return startDate;
};

// const DEADLINE = 20; // Deadline settings
// const WARNING_DEADLINE = 19; // Deadline settings
// const fromDate = new Date();
// console.log(calcDeadline(fromDate, DEADLINE));

module.exports = calcDeadline;
