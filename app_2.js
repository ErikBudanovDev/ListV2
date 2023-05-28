import ApartmentsScraper from "./scrapper/scrapper.js";
import ApartmentUpdater from "./dataCollectors/ApartmentUpdater.js";
import EmailService from "./util/mailsender.js";

class ApartmentManager {
  constructor() {
    this.apartmentsScraper = new ApartmentsScraper();
     this.emailService = new EmailService();
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
      await this.emailService.sendEmail('erik.budanov@gmail.com','Daily Run Success', 'Your daily script run was successful.'); // Use await here
      return true; 
    } catch (error) {
      console.error("Error in managing apartments:", error);
      await this.emailService.sendEmail('erik.budanov@gmail.com','Fail in App', 'Your daily script failed.'); // Use await here
      throw error;
    }
  }
}

// Execute the ApartmentManager
// Create a new instance of ApartmentManager
const apartmentManager = new ApartmentManager();

// Run the script immediately
console.log('Running immediately...');
apartmentManager.manageApartments();

setInterval( async()=>{
  const apartmentManager = new ApartmentManager();
  console.log('waiting')
  await apartmentManager.manageApartments();
},24*60*60*1000)