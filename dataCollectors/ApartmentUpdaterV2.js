import { client, connectClient } from "../util/mongoDBConnector.js";
import SingleApartmentScraper from "../scrapper/singleApartmentScrapper.js";
import { mongoDBCluster } from "../util/config.js";

export default class ApartmentUpdater {
  constructor(newApartments) {
    this.newApartments = newApartments;
    this.soloApartmentScrapper = new SingleApartmentScraper();
  }

  async fetchApartmentDetails(apartmentID) {
    try {
      const details = await this.soloApartmentScrapper.fetchSingleApartment(
        apartmentID
      );
      return details;
    } catch (error) {
      console.error(`Error fetching apartmentID: ${apartmentID}`, error);
      throw error;
    }
  }

  async updateSingleApartment(collection, newApartment) {
    const uniqueId = `${newApartment.apartmentID}-${newApartment.region}`;
    const existingApartment = await collection.findOne({ uniqueId });

    if (existingApartment) {
      const priceKey = Object.keys(newApartment.prices)[0];
      await collection.updateOne(
        { uniqueId },
        {
          $set: {
            [`prices.${priceKey}`]: newApartment.prices[priceKey],
          },
        }
      );
      // console.log(`Updated apartment ${uniqueId}`);
    } else {
      // console.log(newApartment.apartmentID);
      const details = await this.fetchApartmentDetails(
        newApartment.apartmentID
      );

      const fullApartmentData = {
        ...newApartment,
        uniqueId,
        details,
      };
      await collection.insertOne(fullApartmentData);
      // console.log(`Inserted apartment ${uniqueId}`);
    }
  }

  async updatePrices() {
    try {
      await connectClient();
      const db = client.db(mongoDBCluster.db);
      const collection = db.collection(mongoDBCluster.collection);

      const updatePromises = this.newApartments.map((newApartment) =>
        this.updateSingleApartment(collection, newApartment)
      );

      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating apartments in MongoDB:", error);
      throw error;
    } finally {
      console.log("Closing MongoDB connection");
      client.close();
    }
  }
}
