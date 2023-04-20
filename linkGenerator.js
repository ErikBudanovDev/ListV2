// This script will scrap the list view of apartments and return the apartment ID's and save them in SQL database.
// Old apartments will be overwritten with new Apartments

import * as cheerio from "cheerio";
import fetch from "node-fetch";
import connection from "./util/databaseSQL.js";
import { hasDuplicates, removeDuplicates } from "./util/removeduplicates.js";

const idCollector = (searchItem) => {
  let mainUrl = "https://www.list.am/category/60";
  let subPart = "?n=";
  let subPart2 = "&crc=-1";
  let pageNumFront = "/"; // should be added when pageNum > 1

  let apartmentsNew = [];

  async function getApartments() {
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const timeStamp = day + "." + month + "." + year;
      let pageNum = 1;
      let hasNextPage = true;
      while (hasNextPage) {
        hasNextPage = false;
        for (let districtNum = 2; districtNum < 13; districtNum++) {
          let urlCall = `${mainUrl}${pageNumFront}${pageNum}${subPart}${districtNum}${subPart2}`;
          //   console.log(urlCall);
          const response = await fetch(urlCall);
          const body = await response.text();
          const $ = cheerio.load(body);

          $("a").map((index, element) => {
            // console.log($(element).attr("href"));

            let apartmentID = "";

            const apartmentIdRaw = $(element).attr("href");
            const nextPage = $(element).attr("href");
            if (nextPage) {
              const nextPageMatch = nextPage.match(/\/category\/60\/(\d+)/);

              if (nextPageMatch && nextPageMatch[1]) {
                const nextPageNum = parseInt(nextPageMatch[1]);

                if (nextPageNum > pageNum) {
                  pageNum = nextPageNum;
                  hasNextPage = true;
                }
              }
            }
            if (apartmentIdRaw) {
              if (apartmentIdRaw.startsWith("/item") & (apartmentIdRaw != "")) {
                apartmentID = apartmentIdRaw.slice(6);
              }
            }
            const price = $(element).find(".p").text().trim();
            const description = $(element).find(".at").text().trim();

            if ((price != "") & (apartmentID != "") & (price != "")) {
              apartmentsNew.push({
                apartmentID,
                description,
              });
            }
          });
        }
      }
      const apartmentsNewClean = removeDuplicates(apartmentsNew);
      insertData(connection, apartmentsNewClean);
      connection.end((err) => {
        if (err) {
          console.error("Error ending the connection:", err.stack);
          return;
        }
        console.log("Connection closed");
      });
    } catch (error) {
      console.log(error);
    }
  }
  getApartments();
};

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as ID", connection.threadId);
});
idCollector();

function insertData(connection, data) {
  const query = `
    INSERT INTO apartmentIDs(apartmentID, description) VALUES ?
    ON DUPLICATE KEY UPDATE
    description = VALUES(description)
  `;
  // Prepare the data in the format required by the 'mysql' package
  const values = data.map((item) => [item.apartmentID, item.description]);

  connection.query(query, [values], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.stack);
      return;
    }
    console.log("Data inserted successfully:", result.affectedRows, "rows");
  });
}
