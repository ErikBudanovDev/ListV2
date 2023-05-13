import * as cheerio from "cheerio";
import fetch from "node-fetch";

export default class SingleApartmentScraper {
  constructor() {
    this.apartmentsNewFull = [];
    this.singleApartmentUrl = "https://www.list.am/en/item/";
  }

  async fetchSingleApartment(apartmentId) {
    const urlCall = `${this.singleApartmentUrl}${apartmentId}`;
    await sleep(10); // Delay each request by 1 second (10ms)
    const response = await fetch(urlCall);
    const body = await response.text();
    const $ = cheerio.load(body);

    let details = {};

    $('div[class="c"]').each((index, element) => {
      const key = $(element).find(".t").text().trim();
      const value = $(element).find(".i").text().trim();
      if (key && value) {
        details[key] = value;
      }
    });
    return details;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
