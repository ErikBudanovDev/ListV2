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

    for (let districtNum = 3; districtNum < 4; districtNum++) {
      while (hasNextPage) { 
        hasNextPage = false;
        let urlCall = `${mainUrl}${pageNumFront}${pageNum}${subPart}${districtNum}${subPart2}`;
        const response = await fetch(urlCall);
        const body = await response.text();
        const $ = cheerio.load(body);

        const filteredElements = $("a").filter((index, element) => {
          const str = element.attribs.href;
          return str && str.includes(/\/category\/60\/(\d+)/);
        });

        // console.log(filteredElements);
        const nextPageNum = parseInt(filteredElements[1]);
        console.log("nextPage", nextPageNum);
        $("a").map((index, element) => {
          // console.log($(element).attr("href"));
          let apartmentID = "";
          const apartmentIdRaw = $(element).attr("href");
          const nextPage = $(element).attr("href");
          const aTags = $(element).attr("href");
          // console.log("pagenum", pageNum);
          // console.log("nextPage", nextPage);
          // console.log("apartmentIdRaw", apartmentIdRaw);

          // console.log("nexTPage", nextPage);
          // console.log("apartmentIdRaw", apartmentIdRaw);
          // console.log(urlCall);
          if (aTags && aTags.match(/\/category\/60\/(\d+)/)) {
            const nextPageMatch = aTags.match(/\/category\/60\/(\d+)/);
            const nextPageNum = parseInt(nextPageMatch[1]);
            // console.log("nextPage", nextPageNum);
            // console.log("aTags", aTags);
            // console.log("pageNum", pageNum);
            if (nextPageNum > pageNum) {
              pageNum = nextPageNum;
              hasNextPage = true;
            }
          }
          if (apartmentIdRaw) {
            if (apartmentIdRaw.startsWith("/item")) {
              apartmentID = apartmentIdRaw.slice(6);
              // console.log(apartmentID);
              const price = $(element).find(".p").text().trim();
              const region = $(element).find(".at").text().trim();
              apartmentsNew.push({
                region,
                apartmentID,
                districtNum,
                timeStamp,
                prices: { [timeStamp]: price },
              });
              // console.log("length of apartments", apartmentsNew.length);
            }
          }
        });
      }
      // console.log(apartmentsNew.length);
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
