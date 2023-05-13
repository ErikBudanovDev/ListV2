export default class DataPreProcessor {
  constructor(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
  prepareData() {
    if (!Array.isArray(this.data)) {
      throw new TypeError("Data should be an array");
    }

    const reformattedData = this.data.map((apartment) => {
      const datePrices = {};
      for (const dateStr in apartment.prices) {
        const [day, month, year] = dateStr.split("-");
        const date = new Date(year, month - 1, day);

        let price = apartment.prices[dateStr];
        let priceAsNumber = price.includes("֏")
          ? parseInt(price.replace(/[^0-9.-]+/g, ""), 10) / 383
          : parseInt(price.replace(/[^0-9.-]+/g, ""), 10);

        datePrices[date] = priceAsNumber;
      }

      // Sort the date keys in descending order (newest date first)
      const sortedDatePrices = Object.keys(datePrices)
        .sort((a, b) => new Date(b) - new Date(a))
        .reduce((acc, key) => {
          acc[key] = datePrices[key];
          return acc;
        }, {});

      return {
        ...apartment,
        prices: sortedDatePrices,
      };
    });

    this.data = reformattedData;
  }
}
