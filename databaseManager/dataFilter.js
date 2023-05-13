import { mongoDBCluster } from "../util/config.js";

export default class ApartmentFilter {
  constructor(client) {
    this.client = client;
  }
  async filterApartments(filters) {
    console.log(filters);
    try {
      const db = this.client.db(mongoDBCluster.db);
      const collection = db.collection(mongoDBCluster.collection);
      const query = {
        "details.Construction Type": filters.constructionType,
        timeStamp: filters.timeStamp,
        districtNum: filters.districtNum,
        "details.Floor": filters.floor,
      };
      const results = await collection.find(query).toArray();
      console.log("Filtered apartments:", results.length);
      return results;
    } catch (error) {
      console.error("Error filtering apartments:", error);
      throw error;
    }
  }
}
