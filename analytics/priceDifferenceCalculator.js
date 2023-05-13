// priceDifferenceCalculator.js

class PriceDifferenceCalculator {
  calculateDifference(datePrices) {
    const dates = Object.keys(datePrices).sort(
      (a, b) => new Date(b) - new Date(a)
    );
    if (dates.length <= 1) {
      return null;
    }
    const secondNewestDateStr = dates[dates.length - 1];
    const newestDateStr = dates[0];
    // console.log("Second newest date:", secondNewestDateStr);
    // console.log("Newest date:", newestDateStr);
    // console.log("Newest date:", newestDateStr);
    // console.log("Second newest date:", secondNewestDateStr);
    const difference =
      datePrices[newestDateStr] - datePrices[secondNewestDateStr];

    return difference;
  }
}

export default PriceDifferenceCalculator;
