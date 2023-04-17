import fetch from "node-fetch";
import apartmentsNew from "./Collector_9.3.2023.json" assert { type: "json" };
import collector from "./Collector_2.2.2023.json" assert { type: "json" };
import fs from "fs";

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const timeStamp = day + "." + month + "." + year;

const newCollector = addPrice(collector, apartmentsNew);

function addPrice(collector, newData) {
  let newAp = [];

  for (let i = 0; i < collector.length; i++) {
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

// console.log(newCollector);

fs.writeFile(
  `Collector_${timeStamp}.json`,
  JSON.stringify(newCollector),
  function (error) {
    if (error) return console.log(error);
    console.log("file saved");
  }
);

// const response = await fetch(
//   `https://apartmentsanalytics-default-rtdb.europe-west1.firebasedatabase.app/`,
//   {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ [timeStamp]: newCollector }),
//   }
// ).catch((err) => {
//   console.log("Error", err);
// });
// console.log("Success", response);

const Collector = [
  {
    region: "Աջափնյակ, 3 սեն., 77 ք.մ., 3/5 հարկ",
    apartmentID: "17900508",
    districtNum: 2,
    timeStamp: "23.8.2022",
    prices: {
      "23.8.2022": "53,000,000 ֏",
      "22.8.2022": "53,000,000 ֏",
      "21.8.2022": "53,000,000 ֏",
    },
  },
  {
    region: "Աջափնյակ, 4 սեն., 124 ք.մ., 9/14 հարկ",
    apartmentID: "12900508",
    districtNum: 2,
    timeStamp: "23.8.2022",
    prices: { "23.8.2022": "44,000,000 ֏" },
  },
];

const newData = [
  {
    region: "Աջափնյակ, 3 սեն., 77 ք.մ., 3/5 հարկ",
    apartmentID: "17900508",
    districtNum: 2,
    timeStamp: "26.8.2022",
    prices: { "26.8.2022": "60,000,000 ֏" },
  },
  {
    region: "Աջափնյակ, 4 սեն., 124 ք.մ., 9/14 հարկ",
    apartmentID: "17843559",
    districtNum: 2,
    timeStamp: "26.8.2022",
    prices: { "26.8.2022": "46,000,000 ֏" },
  },
];
