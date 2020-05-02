const YEAR = new Date().getFullYear();
const WEEKENDS = [6, 0];
const memorialDay = () => {
  const memDay = new Date(YEAR, 4, 5).getTime();
  const memDayYears = [0, 5];
  const lastDigitYear = YEAR.toString().slice(-1);
  if (memDayYears.includes(+lastDigitYear)) {
    return memDay;
  }
  return null;
};
const OFFICIAL_HOLIDAYS = [
  new Date(YEAR, 0, 1).getTime(),
  new Date(YEAR, 3, 12).getTime(),
  new Date(YEAR, 3, 13).getTime(),
  new Date(YEAR, 3, 27).getTime(),
  memorialDay(),
  new Date(YEAR, 4, 21).getTime(),
  new Date(YEAR, 4, 31).getTime(),
  new Date(YEAR, 5, 1).getTime(),
  new Date(YEAR, 11, 25).getTime(),
  new Date(YEAR, 11, 26).getTime(),
];

const DEADLINE = 21;
const WARNING_DEADLINE = 19;

const fromDate = new Date(Date.now());

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
