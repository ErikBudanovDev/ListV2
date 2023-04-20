// importing all neccessary files
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";
// creating main link for Listam
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
      for (let districtNum = 3; districtNum < 4; districtNum++) {
        let urlCall = `${mainUrl}${pageNumFront}${pageNum}${subPart}${districtNum}${subPart2}`;
        console.log(urlCall);
        const response = await fetch(urlCall);
        const body = await response.text();
        const $ = cheerio.load(body);

        $("a").map((index, element) => {
          // console.log($(element).attr("href"));

          let apartmentID = "";

          const nextPage = $(element).attr("href");
          if (nextPage) {
            const nextPageMatch = nextPage.match(/\/category\/60\/(\d+)/);

            if (nextPageMatch && nextPageMatch[1]) {
              const nextPageNum = parseInt(nextPageMatch[1]);

              if (nextPageNum > pageNum) {
                console.log("next page", nextPageNum);
                pageNum = nextPageNum;
                hasNextPage = true;
              }
            }
          }
          const price = $(element).find(".p").text().trim();
          const region = $(element).find(".at").text().trim();

          if ((price != "") & (apartmentID != "") & (price != "")) {
            apartmentsNew.push({
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

    // const dav = addPrice(Collector, apartmentsNew);

    // const newArray = addPrice(apartmentsOld, apartmentsNew);

    // const response = await fetch(
    //   `https://apartmentsanalytics-default-rtdb.europe-west1.firebasedatabase.app/`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ [timeStamp]: apartmentsNew }),
    //   }
    // ).catch((err) => {
    //   console.log("Error", err);
    // });
    // console.log("Success", response);

    // fs.writeFile(
    //   `test1_${timeStamp}.json`,
    //   JSON.stringify(apartmentsNew),
    //   function (error) {
    //     if (error) return console.log(error);
    //     console.log("file saved");
    //   }
    // );
    // fs.writeFile(
    //   `Test_${timeStamp}.json`,
    //   JSON.stringify(apartmentsNew),
    //   function (error) {
    //     if (error) return console.log(error);
    //     console.log("file saved");
    //   }
    // );
  } catch (error) {
    console.log(error);
  }
}

getApartments();

// setInterval(()=>{getApartments()},'86400000');
function addPrice(collector, newData) {
  let newAp = [];

  for (let i = 0; i < newData.length; i++) {
    const obj1 = collector[i];
    const obj2 = newData.find((item) => item.apartmentID === obj1.apartmentID);
    if (obj2) {
      obj2.prices = {
        ...obj1.prices,
        ...obj2.prices,
      };
    }
  }
  const newApartments = newData.filter(
    (item) => !collector.some((other) => other.apartmentID === item.apartmentID)
  );

  //   console.log("newApartment", newApartments);

  return newData;
}
