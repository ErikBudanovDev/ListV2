import { client, connectClient } from "../util/mongoDBConnector.js";
import ApartmentFilter from "../databaseManager/dataFilter.js";
import DataPreProcessor from "../databaseManager/dataPreparation.js";
import PriceStatistics from "./priceStatistics.js";
import PriceDifferenceCalculator from "./priceDifferenceCalculator.js";
import PriceChangeCounter from "./priceChangeCounter.js";
import HistogramGenerator from "../util/histogramGenerator.js";
import moment from "moment";
import MonthlyFilter from "../databaseManager/monthlyFilter.js";
// ...

// After calculating priceChanges

export default class PriceAnalytics extends PriceStatistics {
  constructor(filters) {
    super();
    this.filters = filters;
    this.priceDifferenceCalculator = new PriceDifferenceCalculator();
    this.priceChangeCounter = new PriceChangeCounter();
  }

  async getFilteredApartments() {
    const apartmentFilter = new ApartmentFilter(client);
    const filteredApartments = await apartmentFilter.filterApartments(
      this.filters
    );
    return filteredApartments;
  }

  async getMonthlyFilteredApartments(dateToAnalyze) {
    const apartmentFilter = new MonthlyFilter(client);
    const filteredApartments = await apartmentFilter.filterApartments(
      this.filters,
      dateToAnalyze
    );
    return filteredApartments;
  }

  averagePriceCalculator(preparedApartments) {
    let totalPricePerSqm = 0;
    let apartmentsCount = 0;
    let pricesPerSqm = [];

    preparedApartments.forEach((apartment, index) => {
      const floorAreaNumber = parseFloat(
        apartment.details["Floor Area"].split(" ")[0]
      );
      const firstPriceKey = Object.keys(apartment.prices)[0];
      let priceString = apartment.prices[firstPriceKey];

      if (!isNaN(priceString)) {
        if (typeof priceString === "string") {
          priceString = parseFloat(priceString.replace(/[$,]/g, ""));
        }
        // Only consider apartments with valid prices
        const pricePerSqm = priceString / floorAreaNumber;
        totalPricePerSqm += pricePerSqm;
        apartmentsCount += 1; // Increment the count for valid prices
        pricesPerSqm.push(pricePerSqm);
      }
    });

    const { q1, q3, iqr } = this.calculateIQR(pricesPerSqm);
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    // console.log("Lower bound:", lowerBound);
    // console.log("Upper bound:", upperBound);
    const filteredPricesPerSqm = pricesPerSqm.filter(
      (pricePerSqm) => pricePerSqm >= lowerBound && pricePerSqm <= upperBound
    );
    const medianPricePerSqm = this.calculateMedian(filteredPricesPerSqm);
    const modePricePerSqm = this.calculateMode(filteredPricesPerSqm);
    if (filteredPricesPerSqm.length > 0) {
      const averagePricePerSqm =
        filteredPricesPerSqm.reduce((a, b) => a + b, 0) /
        filteredPricesPerSqm.length;

      return {
        averagePricePerSqm,
        medianPricePerSqm,
        modePricePerSqm,
      };
    } else {
      // console.log("No apartments with valid prices found.");
      return {
        averagePricePerSqm: NaN,
        medianPricePerSqm,
        modePricePerSqm,
      };
    }
  }

  async performAnalysis() {
    try {
      await connectClient();
      const filteredApartments = await this.getFilteredApartments();
      const dataPreProcessor = new DataPreProcessor(filteredApartments);
      await dataPreProcessor.prepareData();
      const preparedApartments = await dataPreProcessor.getData();
      const differenceArray = preparedApartments.map((apartment) => {
        const diff = this.priceDifferenceCalculator.calculateDifference(
          apartment.prices
        );
        return { ...apartment, diff };
      });
      const averagePricePerSqm =
        this.averagePriceCalculator(preparedApartments);
      const loweredPricesCount =
        this.priceChangeCounter.countLoweredPrices(differenceArray);
      const increasedPricesCount =
        this.priceChangeCounter.countIncreasedPrices(differenceArray);

      const priceChanges = differenceArray
        .map((object) => object.diff)
        .filter((priceChange) => priceChange !== null && !isNaN(priceChange));

      // Add this line to filter out 0s
      const nonZeroPriceChanges = priceChanges.filter(
        (priceChange) => priceChange !== 0
      );

      const medianPriceChange = this.calculateMedian(priceChanges);
      const modePriceChange = this.calculateMode(priceChanges);

      const { q1, q3, iqr } = this.calculateIQR(nonZeroPriceChanges);
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;

      const filteredPriceChanges = priceChanges.filter(
        (priceChange) => priceChange >= lowerBound && priceChange <= upperBound
      );

      const averagePriceChange = this.calculateAverage(filteredPriceChanges);
      // const histogramGenerator = new HistogramGenerator(priceChanges, 40);
      // histogramGenerator.exportToCSV("price_changes_histogram.csv");
      console.log("Analytics results:");
      console.log("Lowered prices count:", loweredPricesCount);
      console.log("Increased prices count:", increasedPricesCount);
      console.log("Average price changes:", averagePriceChange);
      const numericPriceChanges = priceChanges.filter(
        (priceChange) => !isNaN(priceChange)
      );
      const minPriceChange = Math.min(...filteredPriceChanges);
      const maxPriceChange = Math.max(...filteredPriceChanges);
      // console.log("Minimum price change:", minPriceChange);
      // console.log("Maximum price change:", maxPriceChange);
      return {
        loweredPricesCount: loweredPricesCount,
        increasedPricesCount: increasedPricesCount,
        averagePricePerSqm: averagePricePerSqm,
        medianPriceChange: medianPriceChange,
        modePriceChange: modePriceChange,
        averagePriceChange: averagePriceChange,
        minPriceChange: minPriceChange,
        maxPriceChange: maxPriceChange,
      };
    } catch (error) {
      console.error("Error performing analytics:", error);
      throw error;
    } finally {
      // console.log("Closing MongoDB connection");
      // await client.close();
      // console.log("Closed MongoDB connection");
    }
  }

  async calculateMonthlyAveragePrices() {
    const dateNow = moment(this.filters.timeStamp, "DD-MM-YYYY");
    const monthlyAveragePrices = [];

    for (let i = 0; i < 90; i++) {
      const dateToAnalyze = dateNow
        .clone()
        .subtract(i, "days")
        .format("DD-MM-YYYY");
      // console.log("Analyzing date:", dateToAnalyze);
      const filteredApartments = await this.getMonthlyFilteredApartments(
        dateToAnalyze
      );
      const dataPreProcessor = new DataPreProcessor(filteredApartments);
      await dataPreProcessor.prepareData();
      const preparedApartments = await dataPreProcessor.getData();
      const analysisResult = this.averagePriceCalculator(preparedApartments);
      monthlyAveragePrices.push({
        date: dateToAnalyze,
        averagePricePerSqm: analysisResult.averagePricePerSqm,
      });
      // console.log("Analysis result:", analysisResult);
    }
    return monthlyAveragePrices;
  }
}

// (async () => {
//   const filters = {
//     constructionType: "Stone",
//     timeStamp: "13-4-2023",
//     floor: "2",
//     districtNum: 2,
//     // newConstruction: "No",
//     // floorsInBuilding: "16",
//     // floor: "14",
//     // balcony: "Open balcony",
//     // renovation: "Old Renovation",
//   };

//   const analytics = new PriceAnalytics(filters);
//   // await analytics.performAnalysis();
//   await analytics.calculateMonthlyAveragePrices();
// })();
