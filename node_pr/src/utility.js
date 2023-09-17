const calcPeriodMounth = (month) => {
  const date = new Date();
  const from = new Date(date.setMonth(date.getMonth() - month + 1));
  return `${from.getFullYear()}-${from.getMonth()}-${from.getDate()}T00:00:00Z`;
}

module.exports.calcPeriodMounth = calcPeriodMounth;
