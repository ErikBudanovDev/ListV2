import ApartmentsScraper from "./scrapper/scrapper.js";
import ApartmentUpdater from "./dataCollectors/ApartmentUpdater.js";

class ApartmentManager {
  constructor() {
    this.apartmentsScraper = new ApartmentsScraper();
  }

  async manageApartments() {
    try {
      // Scrape apartments from the website
      console.log("Starting apartment scraping...");
      await this.apartmentsScraper.fetchApartments();

      // Read the fetched apartment data
      const timeStamp = this.apartmentsScraper.timeStamp;
      const newApartments = this.apartmentsScraper.apartmentsNew;

      // Update the apartments in the database
      console.log("Updating apartments in the database...");
      const apartmentUpdater = new ApartmentUpdater(newApartments);
      await apartmentUpdater.updatePrices();
      console.log("Finished managing apartments.");
      return true;
    } catch (error) {
      console.error("Error in managing apartments:", error);
      throw error;
    }
  }
}

// Execute the ApartmentManager
(async () => {
  const apartmentManager = new ApartmentManager();
  await apartmentManager.manageApartments();
  return true;
})();
