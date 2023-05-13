import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

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

    for (let districtNum = 2; districtNum < 13; districtNum++) {
      let pageNum = 1;
      let hasNextPage = true;
      while (hasNextPage) {
        hasNextPage = false;
        let urlCall = `${mainUrl}${pageNumFront}${pageNum}${subPart}${districtNum}${subPart2}`;
        const response = await fetch(urlCall);
        const body = await response.text();
        const $ = cheerio.load(body);

        const filteredElements = $("a").filter((index, element) => {
          const str = element.attribs.href;
          return str && str.match(/\/category\/60\/(\d+)/);
        });

        const nextPageNum = filteredElements
          .map((index, element) => {
            const nextPageMatch = $(element)
              .attr("href")
              .match(/\/category\/60\/(\d+)/);
            return parseInt(nextPageMatch[1]);
          })
          .get()
          .filter((num, i, arr) => num > pageNum)
          .sort((a, b) => a - b);

        if (nextPageNum.length > 0) {
          pageNum = nextPageNum[0]; // get the smallest page number that is greater than the current page number
          hasNextPage = true;
        }

        $("a[href^='/item']").each((index, element) => {
          const apartmentIdRaw = $(element).attr("href");
          const apartmentID = apartmentIdRaw.slice(6);
          const price = $(element).find(".p").text().trim();
          const region = $(element).find(".at").text().trim();
          apartmentsNew.push({
            region,
            apartmentID,
            districtNum,
            timeStamp,
            prices: { [timeStamp]: price },
          });
        });

        // console.log("pageNum", pageNum);
      }
    }
    fs.writeFile(
      `apartments_${timeStamp}.json`,
      JSON.stringify(apartmentsNew),
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
