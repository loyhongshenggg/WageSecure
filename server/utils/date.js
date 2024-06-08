function daysBetweenDates(date1, date2) {
    // Parse the date strings into Date objects
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calculate the difference in time (milliseconds)
    const timeDifference = endDate - startDate;

    // Convert the time difference from milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const dayDifference = timeDifference / millisecondsPerDay;

    // Return the difference in days
    return Math.floor(dayDifference);
}


module.exports = { daysBetweenDates };