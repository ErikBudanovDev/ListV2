import data from "../Collectors/Collector_22.3.2023.json" assert { type: "json" };
import fs from "fs";

function replaceDotsWithHyphens(data) {
  return data.map((item) => {
    const newPrices = {};

    for (const [key, value] of Object.entries(item.prices)) {
      const newKey = key.replace(/\./g, "-");
      newPrices[newKey] = value;
    }

    return {
      ...item,
      timeStamp: item.timeStamp.replace(/\./g, "-"),
      prices: newPrices,
    };
  });
}

const updatedData = replaceDotsWithHyphens(data);

fs.writeFile(
  `../Collectors/Collector_22_cleaned.json`,
  JSON.stringify(updatedData),
  (error) => {
    if (error) return console.log(error);
    console.log("file saved");
  }
);

console.log("updatedData");
