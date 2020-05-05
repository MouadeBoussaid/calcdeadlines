const YEAR = new Date().getFullYear();
const WEEKENDS = [6, 0];
const getMemorialDay = () => {
  const memDay = new Date(YEAR, 4, 5).getTime();
  const memDayYears = [0, 5];
  const lastDigitYear = YEAR.toString().slice(-1);
  if (memDayYears.includes(+lastDigitYear)) return memDay;
  return null;
};
const getEaster = (year, type = 'sunday') => {
	const f = Math.floor,
		// Golden Number - 1
		G = year % 19,
		C = f(year / 100),
		// related to Epact
		H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
		// number of days from 21 March to the Paschal full moon
		I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
		// weekday for the Paschal full moon
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		// number of days from 21 March to the Sunday on or before the Paschal full moon
		L = I - J,
    month = 3 + f((L + 40)/44),
    day = L + 28 - 31 * f(month / 4);

	return type === 'sunday' ? new Date(`${year}-${month}-${day}`) : new Date(`${year}-${month}-${day + 1}`);
}

const getAscensionDay = () => {
  return getEaster(YEAR).setDate(getEaster(YEAR).getDate() + 39); 
}

const getPentecost = (type = 'sunday') => {
  const ascensionDay = new Date(getAscensionDay());
  const pentecost = ascensionDay.setDate(ascensionDay.getDate() + 10);
  const dayAfterPentecost = new Date(pentecost).setDate(new Date(pentecost).getDate() + 1);
  return type === 'sunday' ? pentecost : dayAfterPentecost;
}

const OFFICIAL_HOLIDAYS = [
  new Date(YEAR, 0, 1).getTime(), // New year
  getEaster(YEAR, 'sunday').getTime(),
  getEaster(YEAR, 'monday').getTime(),
  new Date(YEAR, 3, 27).getTime(), // Kingsday
  getMemorialDay(), // 5th of may every 5 years
  getAscensionDay(),
  getPentecost('sunday'),
  getPentecost('monday'),
  new Date(YEAR, 11, 25).getTime(), // Christmas
  new Date(YEAR, 11, 26).getTime(), // Christmas
];

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
// // const WARNING_DEADLINE = 19; // Deadline settings
// const fromDate = new Date();
// console.log(calcDeadline(fromDate, DEADLINE));

module.exports = calcDeadline;
