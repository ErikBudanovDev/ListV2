import { mongoDBCluster } from "../util/config.js";
import moment from "moment";

export default class MonthlyFilter {
  constructor(client) {
    this.client = client;
  }

  // Check if an apartment's prices object contains a price for a specific date
  hasPriceForDate(apartment, date) {
    const dateFormatted = moment(date, "DD-MM-YYYY").format("D-M-YYYY");
    return apartment.prices.hasOwnProperty(dateFormatted);
  }

  async filterApartments(filters, dateToAnalyze) {
    try {
      const db = this.client.db(mongoDBCluster.db);
      const collection = db.collection(mongoDBCluster.collection);
      const query = {
        "details.Construction Type": filters.constructionType,
        districtNum: filters.districtNum,
        "details.Floor": filters.floor,
      };

      let results = await collection.find(query).toArray();
      results = results.filter((apartment) =>
        this.hasPriceForDate(apartment, dateToAnalyze)
      );

      //   console.log("Filtered apartments:", results.length);
      return results;
    } catch (error) {
      console.error("Error filtering apartments:", error);
      throw error;
    }
  }
}
