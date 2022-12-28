import fetch from "node-fetch";
import apartmentsNew from "./apartments_32.11.2022.json" assert { type: "json" };
import apartments from "./apartments_28.11.2022.json" assert { type: "json" };
import fs from "fs";
const example = [
  {
    region: "Աջափնյակ, 3 սեն., 77 ք.մ., 3/5 հարկ",
    apartmentID: "17843559",
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
    apartmentID: "17900508",
    districtNum: 2,
    timeStamp: "23.8.2022",
    prices: { "23.8.2022": "44,000,000 ֏" },
  },
];

const example2 = [
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

function addPrice(collector, newApparment) {
  let newAp = [];
  //   console.log(arr1.length);
  for (let i = 0; i < collector.length; i++) {
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
  //   const ob3 = obj1.find((item) => item.apartmentID != newApparment.apartmentID);
  //   console.log(obj3);
  return collector;
}

const dav = addPrice(example2, example);

console.log(dav);
// fs.writeFile(`apartmentsCollected.json`, JSON.stringify(dav), function (error) {
//   if (error) return console.log(error);
//   console.log("file saved");
// });
