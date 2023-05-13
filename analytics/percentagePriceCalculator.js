import { PriceChangeCalculator } from "./price_change_calculator"; // Import the PriceChangeCalculator class
import { connectClient, client } from "./mongoDBConnector"; // Import the connectClient function and client from mongoDBConnector module
import { mongoDBCluster } from "../util/config";

class PriceChangeTracker {
  constructor(interval) {
    this.interval = interval;
  }

  async calculateAndStorePriceChanges() {
    try {
      await connectClient();

      const db = client.db(mongoDBCluster.db);
      const apartments = db.collection(mongoDBCluster.collection);
      const priceChanges = db.collection("PriceChanges");

      const cursor = apartments.find();
      const results = [];

      while (await cursor.hasNext()) {
        const apartment = await cursor.next();
        const calculator = new PriceChangeCalculator(apartment, this.interval);
        const priceChange = await calculator.calculate();

        if (priceChange) {
          results.push(priceChange);
        }
      }

      if (results.length > 0) {
        await priceChanges.insertMany(results);
      }

      console.log(
        `Stored ${results.length} price changes for ${this.interval} interval.`
      );
    } catch (error) {
      console.error("Error in calculating and storing price changes:", error);
    } finally {
      await client.close();
    }
  }
}

// Example usage:
// const dailyPriceChangeTracker = new PriceChangeTracker("daily");
// dailyPriceChangeTracker.calculateAndStorePriceChanges();
