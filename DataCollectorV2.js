import apartmentsNew from "./RAW_Data/apartments_17.3.2023.json" assert { type: "json" };
import collector from "./Collectors/Collector_9.3.2023.json" assert { type: "json" };
import fs from "fs";

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const timeStamp = day + "." + month + "." + year;

const newCollector = mergeData(collector, apartmentsNew);

function mergeData(collector, newData) {
  let result = [];

  // Iterate through newData
  newData.forEach((newApartment) => {
    const existingApartment = collector.find(
      (oldApartment) =>
        oldApartment.apartmentID === newApartment.apartmentID &&
        oldApartment.region === newApartment.region
    );

    if (existingApartment) {
      // Update the newApartment object with the existing prices from collector
      for (const key in existingApartment.prices) {
        newApartment.prices[key] = existingApartment.prices[key];
      }
      // Add the new price from newData
      newApartment.prices[timeStamp] = newApartment.prices[timeStamp];
    }
    result.push(newApartment);
  });

  // Iterate through collector and add the objects that are not present in newData
  // and have a 9.3.2023 timestamp
  collector.forEach((oldApartment) => {
    const existsInNewData = newData.some(
      (newApartment) =>
        newApartment.apartmentID === oldApartment.apartmentID &&
        newApartment.region === oldApartment.region
    );

    if (!existsInNewData && oldApartment.prices.hasOwnProperty("9.3.2023")) {
      result.push(oldApartment);
    }
  });

  return result;
}

fs.writeFile(
  `Collector_${timeStamp}..json`,
  JSON.stringify(newCollector),
  function (error) {
    if (error) return console.log(error);
    console.log("file saved");
  }
);
