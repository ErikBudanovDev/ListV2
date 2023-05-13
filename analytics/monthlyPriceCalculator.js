export default class MonthlyPriceCalculator {
  constructor(apartments) {
    this.apartments = apartments;
  }

  // Convert a date string to a Date object
  parseDate(dateString) {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day);
  }

  // Check if two dates are in the same month
  isSameMonth(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

  // Calculate the average of an array of numbers
  calculateAverage(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
  }

  // Calculate the average price for a given month
  calculateMonthlyAveragePrice(month) {
    const monthDate = this.parseDate(`1-${month}`);
    let prices = [];

    this.apartments.forEach((apartment) => {
      Object.entries(apartment.prices).forEach(([dateString, priceString]) => {
        const date = this.parseDate(dateString);
        const price = parseFloat(priceString.replace(/[$,]/g, ""));

        if (this.isSameMonth(date, monthDate)) {
          prices.push(price);
        }
      });
    });

    return this.calculateAverage(prices);
  }
}

const apartments = [
  // Your array of apartment objects
];

const calculator = new MonthlyPriceCalculator(apartments);
const averagePrice = calculator.calculateMonthlyAveragePrice("4-2023");
console.log(`Average price for April 2023: $${averagePrice}`);
