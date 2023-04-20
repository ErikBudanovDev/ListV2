import collector from "./Collectors/Collector_17.3.2023..json" assert { type: "json" };
import lastMonthAppartmentsRaw from "./RAW_Data/apartments_9.3.2023.json" assert { type: "json" };
import currentMonthAppartmentRaw from "./RAW_Data/apartments_17.3.2023.json" assert { type: "json" };
import { Headers } from "node-fetch";

const currency = 388;
// currencyShower();

function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(year, month - 1, day);
}

function filterByDistrict(array, districtNum) {
  return array.filter((item) => item.districtNum === districtNum);
}
const districtNum = 9;
const districts = {
  1: "Yerevan",
  2: "Arabkir",
  3: "Avan",
  4: "Davitashen",
  5: "Erebuni",
  6: "Kanaker_Zeytun",
  7: "Kentron",
  8: "Malatia",
  9: "Nor_Nork",
  10: "Shengavit",
  11: "Nork_Marash",
  12: "Nubarashen",
};

const filteredCollector = filterByDistrict(collector, districtNum);
// const filteredCollector = collector;

filteredCollector.sort((a, b) => {
  const aLatestDate = Math.max(
    ...Object.keys(a.prices).map((dateString) =>
      parseDate(dateString).getTime()
    )
  );
  const bLatestDate = Math.max(
    ...Object.keys(b.prices).map((dateString) =>
      parseDate(dateString).getTime()
    )
  );

  return bLatestDate - aLatestDate; // Sort in descending order (newest first)
});

class DatePrices {
  constructor(datePrices) {
    this.datePrices = this.prepareData(datePrices);
  }
  prepareData(datePrices) {
    const reformattedDatePrices = {};
    for (const dateStr in datePrices) {
      const [day, month, year] = dateStr.split(".");
      const date = new Date(year, month - 1, day); // Subtract 1 from the month value

      let price = datePrices[dateStr];
      let priceAsNumber = price.includes("֏")
        ? parseInt(price.replace(/[^0-9.-]+/g, ""), 10) / currency
        : parseInt(price.replace(/[^0-9.-]+/g, ""), 10);

      reformattedDatePrices[date] = priceAsNumber;
    }

    // Sort the date keys in descending order (newest date first)
    const sortedDatePrices = Object.keys(reformattedDatePrices)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, key) => {
        acc[key] = reformattedDatePrices[key];
        return acc;
      }, {});

    return sortedDatePrices;
  }

  calculateDifference() {
    // console.log(this.datePrices);
    const dates = Object.keys(this.datePrices).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    if (dates.length <= 1) {
      return null;
    }
    // console.log(dates);
    const secondNewestDate = new Date(dates[dates.length - 2]);

    const newestDate = new Date(dates[dates.length - 1]);

    const difference =
      this.datePrices[newestDate] - this.datePrices[secondNewestDate];
    return difference;
  }
}

const differenceArray = filteredCollector.map((dates) => {
  const datePrices = new DatePrices(dates.prices);
  const diff = datePrices.calculateDifference();
  return { ...dates, diff };
});
const validDiffValues = differenceArray
  .map((object) => object.diff)
  .filter((value) => !isNaN(value));

const average =
  validDiffValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  ) / validDiffValues.length;

const sortedDiffValues = [...validDiffValues].sort((a, b) => a - b);
const middleIndex = Math.floor(sortedDiffValues.length / 2);
const median =
  sortedDiffValues.length % 2 === 1
    ? sortedDiffValues[middleIndex]
    : (sortedDiffValues[middleIndex - 1] + sortedDiffValues[middleIndex]) / 2;

const mode = validDiffValues.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

const maxFrequency = Math.max(...Object.values(mode));
const modeValue = Object.keys(mode).find((key) => mode[key] === maxFrequency);

function countLoweredPrices(differenceArray) {
  return differenceArray.filter((object) => object.diff < 0).length;
}

function countIncreasedPrices(differenceArray) {
  return differenceArray.filter((object) => object.diff > 0).length;
}

const loweredPricesCount = countLoweredPrices(differenceArray);
const increasedPricesCount = countIncreasedPrices(differenceArray);

console.log(`Analytics for ${districts[districtNum]}`);
// console.log("median", median);
// console.log("mode", modeValue);
console.log(`average price change`, average);
console.log("lowered prices count", loweredPricesCount);
console.log("increased prices count", increasedPricesCount);

async function currencyShower() {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "KEJNwPFZPqG0gsKT6nSHlFov0ke2NK27");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      "https://api.apilayer.com/exchangerates_data/convert?to=AMD&from=USD&amount=1",
      requestOptions
    );
    const data = await response.json();
    return data.info.rate;
    // const exchangeRate = data.rates.AMD;
    // console.log(`The current exchange rate for USD to AMD is: ${exchangeRate}`);
  } catch (error) {
    console.error(error);
  }
}

///////////////// COunting the number of lowered and increased prices

const lastMonthAppartments = removeDuplicateObjects(lastMonthAppartmentsRaw);
const currentMonthAppartment = removeDuplicateObjects(
  currentMonthAppartmentRaw
);
console.log("lastMonthApartment Raw length", lastMonthAppartmentsRaw.length);
console.log(
  "currentMonthAppartment Raw length",
  currentMonthAppartmentRaw.length
);
console.log("lastMonthApartment length", lastMonthAppartments.length);
console.log("currentMonthAppartment length", currentMonthAppartment.length);

function compareArrays(newArray, oldArray) {
  let newObjectsCount = 0;
  let oldObjectsCount = 0;

  const oldApartmentIds = oldArray.map((obj) => obj.apartmentID);
  const newApartmentIds = newArray.map((obj) => obj.apartmentID);

  newApartmentIds.forEach((id) => {
    if (!oldApartmentIds.includes(id)) {
      newObjectsCount++;
    }
  });

  oldApartmentIds.forEach((id) => {
    if (!newApartmentIds.includes(id)) {
      oldObjectsCount++;
    }
  });

  return {
    newObjectsCount: newObjectsCount,
    oldObjectsCount: oldObjectsCount,
  };
}

const result = compareArrays(currentMonthAppartment, lastMonthAppartments);
console.log(`Number of new apartments: ${result.newObjectsCount}`);
console.log(
  `Number of apartments in old array but not in the new: ${result.oldObjectsCount}`
);

// function countDuplicateObjects(array) {
//   const uniqueObjects = new Set();
//   let duplicateCount = 0;

//   array.forEach((obj) => {
//     // Convert the object to a string using JSON.stringify for comparison purposes
//     const objStr = JSON.stringify(obj);

//     if (uniqueObjects.has(objStr)) {
//       duplicateCount++;
//     } else {
//       uniqueObjects.add(objStr);
//     }
//   });

//   return duplicateCount;
// }

// const duplicateCountOld = countDuplicateObjects(lastMonthAppartments);
// const duplicateCountNew = countDuplicateObjects(currentMonthAppartment);

function removeDuplicateObjects(array) {
  const uniqueObjects = new Set();

  return array.filter((obj) => {
    // Convert the object to a string using JSON.stringify for comparison purposes
    const objStr = JSON.stringify(obj);

    if (uniqueObjects.has(objStr)) {
      return false;
    } else {
      uniqueObjects.add(objStr);
      return true;
    }
  });
}
