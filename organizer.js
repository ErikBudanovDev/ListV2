import fetch from "node-fetch";
import apartments from "./apartments_16.8.2022.json" assert { type: "json" };


// this class organize the object
class Apartment {
  constructor(apartmentOld) {
    this.apartmentOld = apartmentOld;
  }

  squareCalculator(ap) {
    let arr = ap.region.split(", ");
    return arr;
  }

  cityFinder(districtNum) {
    if (districtNum < 14) {
      return "Yerevan";
    }
  }

  newAppCreator() {
    let addInfo = this.squareCalculator(this.apartmentOld);
    let apartmentNew = {
      [`${this.apartmentOld.apartmentID}`]: {
        id: this.apartmentOld.apartmentID,
        district: addInfo[0],
        districtNum: this.apartmentOld.districtNum,
        amountRooms: addInfo[1],
        sqMeter: addInfo[2],
        level: addInfo[3],
        price: {
          [this.apartmentOld.timeStamp.replaceAll(".", "")]: {
            price: this.apartmentOld.price,
            date: this.apartmentOld.timeStamp,
          },
        },
      },
    };

    return apartmentNew;
  }
}

// let apa = new Apartment(apartmentsOld[0]);
// let data = Object.values(apa.newAppCreator());
// console.log(data[0].id);

function result(apartmentOld) {
  // console.log(apartmentsOld);
  let apa = new Apartment(apartmentOld);
  let data = apa.newAppCreator();
  fetching(data, apartmentOld);

  async function fetching(data, apartmentOld) {
    const response = await fetch(
      `https://apartmentsanalytics-default-rtdb.europe-west1.firebasedatabase.app/yerevan/${apartmentOld.districtNum}/${apartmentOld.apartmentID}.json`
    );
    if (response.ok && response != null) {
      let res = await response.json();

      if (res === null) {
        // Fetch new Structure
        // console.log("error");
        createNewData(data, apartmentOld);
      } else {
        // Fulfill the container
        // console.log(res);
        fullFillData(data, apartmentOld);
      }
    } else {
      console.log("error");
    }
  }
}

function fullFillData(data, apartmentOld) {
  if (apartmentOld.districtNum < 14) {
    let city = "Yerevan";
    let dataT = {
      [apartmentOld.timeStamp.replaceAll(".", "")]: {
        date: apartmentOld.timeStamp,
        price: apartmentOld.price,
      },
    };
}

function createNewData(data, apartmentOld) {
  if (apartmentOld.districtNum < 14) {
    let city = "Yerevan";
    let dataT = {
      [apartmentOld.timeStamp.replaceAll(".", "")]: {
        date: apartmentOld.timeStamp,
        price: apartmentOld.price,
      },
    };
    
  }
}
// console.log(apartmentsJSON.slice(0, 50));

let numberOfIterations = Math.ceil(apartments.length);

for (let i = 0; i < numberOfIterations; i++) {
  let ara = apartments[i];

  //
  setTimeout(
    // console.log("from", 0 + i * 1000);
    // console.log("till", 1000 + 1000 * i);
    () => {
      console.log(i, ara);
      result(ara);
      // console.log((0 + i * 1000, 1000 + 1000 * i));
      // result(apartments.slice((0 + i * 1000, 1000 + 1000 * i)));
    },
    i * 2
  );

  let from = 0 + i * 1000;
  let till = 1000 + 1000 * i;
  // console.log(i);
  // console.log(apartments.length);
}
// console.log(ara);
// console.log(apartments.slice(58000, 59000));

// console.log(apartmentsOld.length);
