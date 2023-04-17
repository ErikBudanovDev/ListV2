// this class returns the difference between first element and last element in the object (Dates -> Price)
import collector from "./Collector_20.1.2023.json" assert { type: "json" };

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const timeStamp = day + "." + month + "." + year;

class DatePrices {
  constructor(datePrices) {
    this.datePrices = datePrices;
  }

  reformat() {
    const reformattedDatePrices = {};
    for (const dateStr in this.datePrices) {
      const [day, month, year] = dateStr.split(".");
      const date = new Date(year, month, day);
      reformattedDatePrices[date] = this.datePrices[dateStr];
    }
    this.datePrices = reformattedDatePrices;
  }

  convertToNumbers() {
    const reformattedDatePrices = {};
    for (const date in this.datePrices) {
      let price = this.datePrices[date];
      // Convert the price to a number
      let priceAsNumber;
      if (price.includes("֏")) {
        priceAsNumber = parseInt(price.replace(/[^0-9.-]+/g, ""), 10) / 390;
      } else {
        priceAsNumber = parseInt(price.replace(/[^0-9.-]+/g, ""), 10);
      }
      reformattedDatePrices[date] = priceAsNumber;
    }
    this.datePrices = reformattedDatePrices;
  }

  calculateDifference(startDate, endDate) {
    // Sort the dates in ascending order
    const dates = Object.keys(this.datePrices).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    const oldestDate = dates[0];
    const newestDate = dates[dates.length - 1];

    // Calculate the difference between the oldest and newest values
    const difference =
      this.datePrices[newestDate] - this.datePrices[oldestDate];
    // console.log(`Difference: ${difference}`);
    return difference;
  }
}

let differenceArray = [];

for (const dates of collector) {
  const datePrices = new DatePrices(dates.prices);
  datePrices.reformat();
  datePrices.convertToNumbers();
  const diff = datePrices.calculateDifference();
  let differenceElement = dates;
  differenceElement["diff"] = diff;
  differenceArray.push(differenceElement);
}

// this if average
const diffValues = differenceArray.map((object) => object.diff);
const validDiffValues = diffValues.filter((value) => !isNaN(value));
const sum = validDiffValues.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

const average = sum / validDiffValues.length;
//median

const sortedDiffValues = validDiffValues.sort((a, b) => a - b);
const middleIndex = Math.floor(sortedDiffValues.length / 2);
let median;
if (sortedDiffValues.length % 2 === 1) {
  median = sortedDiffValues[middleIndex];
} else {
  median =
    (sortedDiffValues[middleIndex - 1] + sortedDiffValues[middleIndex]) / 2;
}

// mode

let mode;
let maxFrequency = 0;
for (const diff in validDiffValues) {
  if (validDiffValues[diff] > maxFrequency) {
    mode = diff;
    maxFrequency = validDiffValues[diff];
  }
}

console.log("median", median);
console.log("mode", maxFrequency);

console.log("average", average);
