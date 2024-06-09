function daysBetweenDates(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const timeDifference = endDate - startDate;

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const dayDifference = timeDifference / millisecondsPerDay;

    return Math.floor(dayDifference);
}


module.exports = { daysBetweenDates };