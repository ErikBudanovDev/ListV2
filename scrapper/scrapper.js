import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";
import { removeDuplicates } from "../util/removeduplicates.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export default class ApartmentsScraper {
  constructor() {
    this.mainUrl = "https://www.list.am/category/60";
    this.subPart = "?n=";
    this.subPart2 = "&crc=-1";
    this.pageNumFront = "/";
    this.apartmentsNew = [];
    this.singleApartmentUrl = "https://www.list.am/en/item/";
  }

  // Main function to fetch apartment data
  saveToFile(timeStamp) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    removeDuplicates(this.apartmentsNew, "apartmentID");
    fs.writeFile(
      join(__dirname, "..", "RAW_Data", `apartments_${timeStamp}.json`),
      JSON.stringify(this.apartmentsNew),
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("file saved");
        }
      }
    );
  }

  async fetchApartments() {
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const timeStamp = `${day}-${month}-${year}`;

      // Loop through each district number (from 2 to 12) 2 is Ajapnyak, 12 is Arabkir
      for (let districtNum = 2; districtNum < 13; districtNum++) {
        let pageNum = 1;
        let hasNextPage = true;

        // While there are more pages to fetch

        while (hasNextPage) {
          hasNextPage = false;
          let urlCall = `${this.mainUrl}${this.pageNumFront}${pageNum}${this.subPart}${districtNum}${this.subPart2}`;
          const response = await fetch(urlCall);
          const body = await response.text();
          // Load the fetched data into cheerio for parsing
          const $ = cheerio.load(body);
          // Get the next page number
          const nextPageNum = this.getNextPageNum($, pageNum);
          if (nextPageNum) {
            pageNum = nextPageNum;
            hasNextPage = true;
          }
          // Process the fetched data and store it in the apartmentsNew array
          this.processApartmentData($, timeStamp, districtNum);
        }
      }
      console.log("Finished fetching apartments.");
      // Save the fetched data to a file
      this.saveToFile(timeStamp);
    } catch (error) {
      console.log(error);
    }
  }
  // Method to get the next page number
  getNextPageNum($, pageNum) {
    const nextPageNum = $("a")
      .filter((index, element) => {
        const str = element.attribs.href;
        return str && str.match(/\/category\/60\/(\d+)/);
      })
      .map((index, element) => {
        const nextPageMatch = $(element)
          .attr("href")
          .match(/\/category\/60\/(\d+)/);
        return parseInt(nextPageMatch[1]);
      })
      .get()
      .filter((num) => num > pageNum)
      .sort((a, b) => a - b);

    return nextPageNum.length > 0 ? nextPageNum[0] : null;
  }
  // Function to process the fetched data and store it in the apartmentsNew array
  processApartmentData($, timeStamp, districtNum) {
    $("a[href^='/item']").each((index, element) => {
      const apartmentIdRaw = $(element).attr("href");
      const apartmentID = apartmentIdRaw.slice(6);
      const price = $(element).find(".p").text().trim();
      const region = $(element).find(".at").text().trim();
      this.apartmentsNew.push({
        region,
        apartmentID,
        districtNum,
        timeStamp,
        prices: { [timeStamp]: price },
      });
    });
  }
  // Function to save the fetched data to a file
}

// const scraper = new ApartmentsScraper();
// scraper.fetchApartments();
