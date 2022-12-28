// importing all neccessary files

import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";
import { stringify } from "querystring";
import { addAbortSignal } from "stream";

// creating main link for Listam
let mainUrl = "https://www.list.am/category/60";
let subPart = "?n=";
let subPart2 = "&crc=-1";

let pageNumFront = "/"; // should be added when pageNum > 1

let apartments = [];

async function getApartments() {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const timeStamp = day + "." + month + "." + year;
    for (let pageNum = 1; pageNum < 21; pageNum++) {
      for (let districtNum = 2; districtNum < 13; districtNum++) {
        let urlCall = `${mainUrl}${pageNumFront}${pageNum}${subPart}${districtNum}${subPart2}`;
        // console.log(urlCall);
        const response = await fetch(urlCall);
        const body = await response.text();
        const $ = cheerio.load(body);

        $("a").map((index, element) => {
          // console.log($(element).attr("href"));

          let apartmentID = "";

          const apartmentIdRaw = $(element).attr("href");

          if (apartmentIdRaw) {
            if (apartmentIdRaw.startsWith("/item") & (apartmentIdRaw != "")) {
              apartmentID = apartmentIdRaw.slice(6);
            }
          }
          const price = $(element).find(".p").text().trim();
          const region = $(element).find(".at").text().trim();

          if ((price != "") & (apartmentID != "") & (price != "")) {
            apartments.push({
              region,
              apartmentID,
              districtNum,
              timeStamp,
              prices: { [timeStamp]: price },
            });
          }
        });
      }
    }

    const dav = addPrice(apartments, collectorAp);
    fs.writeFile(
      `apartments_${collection}.json`,
      JSON.stringify(dav),
      function (error) {
        if (error) return console.log(error);
        console.log("file saved");
      }
    );
  } catch (error) {
    console.log(error);
  }
}

getApartments();

// setInterval(()=>{getApartments()},'86400000');
function addPrice(collector, newApparment) {
  let newAp = [];
  //   console.log(arr1.length);
  for (let i = 0; i < newApparment.length; i++) {
    // console.log(i);
    const obj1 = collector[i];
    const obj2 = newApparment.find(
      (item) => item.apartmentID === obj1.apartmentID
    );
    if (obj2) {
      obj1.prices = {
        ...obj1.prices,
        ...obj2.prices,
      };
    }
  }
  return collector;
}
