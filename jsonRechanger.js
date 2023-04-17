// this file change the prices in object of arrays from price: xxx   to prices: {Date: XXX}

import apartments from "./apartments_10.8.2022.json" assert { type: "json" };
import apartments02 from "./apartments_27.8.2022.json" assert { type: "json" };
import fs from "fs";

function jsonRechanger(apartments) {
  apartments.forEach((object) => {
    // console.log(object);
    object["prices"] = {
      [object.timeStamp]: object.price,
    };
    delete object.price;
    // console.log(object);
  });
  return apartments;
}

const rechanger = jsonRechanger(apartments);

fs.writeFile(
  `apartments_10.8.2022V2.json`,
  JSON.stringify(rechanger),
  function (error) {
    if (error) return console.log(error);
    console.log("file saved");
  }
);
