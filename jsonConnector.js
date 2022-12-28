import apartments from "./apartments_27.11.2022.json" assert { type: "json" };
import apartments02 from "./apartments_27.8.2022.json" assert { type: "json" };
import apartments01 from "./apartments_26.8.2022.json" assert { type: "json" };
import apartments0 from "./apartments_24.8.2022.json" assert { type: "json" };
import apartments1 from "./apartments_11.8.2022.json" assert { type: "json" };
// import apartments2  from './apartments_30.8.2022.json' assert {type: 'json'};
import apartments3 from "./apartments_9.8.2022.json" assert { type: "json" };
import apartments4 from "./apartments_8.8.2022.json" assert { type: "json" };
import apartments5 from "./apartments_7.8.2022.json" assert { type: "json" };
import apartments6 from "./apartments_5.8.2022.json" assert { type: "json" };
import apartments7 from "./apartments_3.8.2022.json" assert { type: "json" };
import apartments8 from "./apartments_2.8.2022.json" assert { type: "json" };
import apartments9 from "./apartments_1.8.2022.json" assert { type: "json" };
import apartments10 from "./apartments_31.7.2022.json" assert { type: "json" };
import apartments11 from "./apartments_30.7.2022.json" assert { type: "json" };
import apartments12 from "./apartments_29.7.2022.json" assert { type: "json" };
import apartments13 from "./apartments_26.7.2022.json" assert { type: "json" };
import apartments14 from "./apartments_25.7.2022.json" assert { type: "json" };
import apartments15 from "./apartments_24.7.2022.json" assert { type: "json" };
import apartments16 from "./apartments_18.7.2022.json" assert { type: "json" };
import apartments17 from "./apartments_15.7.2022.json" assert { type: "json" };
import apartments18 from "./apartments_12.7.2022.json" assert { type: "json" };

import fs from "fs";

let newList = apartments.map(({ region, apartmentID, districtNum }) => ({
  region,
  apartmentID,
  districtNum,
}));

console.log(newList.length);

for (let iden = 1; iden <= newList.length - 10; iden++) {
  const indexAp = apartments.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp02 = apartments02.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp01 = apartments01.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp0 = apartments0.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp1 = apartments1.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  // const indexAp2 = apartments2.findIndex(apartment => apartment.apartmentID == newList[iden].apartmentID);
  const indexAp3 = apartments3.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp4 = apartments4.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp5 = apartments5.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp6 = apartments6.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp7 = apartments7.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp8 = apartments8.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp9 = apartments9.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp10 = apartments10.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp11 = apartments11.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp12 = apartments12.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp13 = apartments13.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp14 = apartments14.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp15 = apartments15.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp16 = apartments16.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp17 = apartments17.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );
  const indexAp18 = apartments18.findIndex(
    (apartment) => apartment.apartmentID == newList[iden].apartmentID
  );

  if (indexAp == -1) {
    // newList[iden]['3.8.2022'] = 0;
  } else {
    newList[iden][apartments[indexAp].timeStamp] = apartments[indexAp].price;
  }
  if (indexAp02 == -1) {
    // newList[iden]['3.8.2022'] = 0;
  } else {
    newList[iden][apartments02[indexAp02].timeStamp] =
      apartments02[indexAp02].price;
  }
  if (indexAp01 == -1) {
    // newList[iden]['3.8.2022'] = 0;
  } else {
    newList[iden][apartments01[indexAp01].timeStamp] =
      apartments01[indexAp01].price;
  }
  if (indexAp0 == -1) {
    // newList[iden]['2.8.2022'] = 0;
  } else {
    newList[iden][apartments0[indexAp0].timeStamp] =
      apartments0[indexAp0].price;
  }

  if (indexAp1 == -1) {
    // newList[iden]['1.8.2022'] = 0;
  } else {
    newList[iden][apartments1[indexAp1].timeStamp] =
      apartments1[indexAp1].price;
  }

  // if(indexAp2 == -1){
  //     // newList[iden]['31.7.2022'] = 0;
  // }
  // else {
  //     newList[iden][apartments2[indexAp2].timeStamp] = apartments2[indexAp2].price;
  // }

  if (indexAp3 == -1) {
    // newList[iden]['30.7.2022'] = 0;
  } else {
    newList[iden][apartments3[indexAp3].timeStamp] =
      apartments3[indexAp3].price;
  }

  if (indexAp4 == -1) {
    // newList[iden]['29.7.2022'] = 0;
  } else {
    newList[iden][apartments4[indexAp4].timeStamp] =
      apartments4[indexAp4].price;
  }

  if (indexAp5 == -1) {
    // newList[iden]['26.7.2022'] = 0;
  } else {
    newList[iden][apartments5[indexAp5].timeStamp] =
      apartments5[indexAp5].price;
  }

  if (indexAp6 == -1) {
    // newList[iden]['25.7.2022'] = 0;
  } else {
    newList[iden][apartments6[indexAp6].timeStamp] =
      apartments6[indexAp6].price;
  }

  if (indexAp7 == -1) {
    // newList[iden]['24.7.2022'] = 0;
  } else {
    newList[iden][apartments7[indexAp7].timeStamp] =
      apartments7[indexAp7].price;
  }

  if (indexAp8 == -1) {
    // newList[iden]['18.7.2022'] = 0;
  } else {
    newList[iden][apartments8[indexAp8].timeStamp] =
      apartments8[indexAp8].price;
  }

  if (indexAp9 == -1) {
    // newList[iden]['15.7.2022'] = 0;
  } else {
    newList[iden][apartments9[indexAp9].timeStamp] =
      apartments9[indexAp9].price;
  }

  if (indexAp10 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments10[indexAp10].timeStamp] =
      apartments10[indexAp10].price;
  }

  if (indexAp11 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments11[indexAp11].timeStamp] =
      apartments11[indexAp11].price;
  }

  if (indexAp12 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments12[indexAp12].timeStamp] =
      apartments12[indexAp12].price;
  }
  // console.log(newList)
  if (indexAp13 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments13[indexAp13].timeStamp] =
      apartments13[indexAp13].price;
  }

  if (indexAp14 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments14[indexAp14].timeStamp] =
      apartments14[indexAp14].price;
  }

  if (indexAp15 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments15[indexAp15].timeStamp] =
      apartments15[indexAp15].price;
  }

  if (indexAp16 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments16[indexAp16].timeStamp] =
      apartments16[indexAp16].price;
  }

  if (indexAp17 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments17[indexAp17].timeStamp] =
      apartments17[indexAp17].price;
  }

  if (indexAp18 == -1) {
    // newList[iden]['12.7.2022'] = 0;
  } else {
    newList[iden][apartments18[indexAp18].timeStamp] =
      apartments18[indexAp18].price;
  }

  if (iden == newList.length - 10) {
    fs.writeFile(
      `NewApartments1.json`,
      JSON.stringify(newList),
      function (error) {
        if (error) return console.log(error);
        console.log("file saved");
      }
    );
  }

  // apartments[iden][apartments4[indexAp4].timeStamp] = apartments4[indexAp4].price;
  // console.log(apartments[iden])
  // apartments[iden][apartments5[indexAp5].timeStamp] = apartments5[indexAp5].price;
  // apartments[iden][apartments6[indexAp6].timeStamp] = apartments6[indexAp6].price;
  // apartments[iden][apartments7[indexAp7].timeStamp] = apartments7[indexAp7].price;
  // apartments[iden][apartments8[indexAp8].timeStamp] = apartments8[indexAp8].price;
  // apartments[iden][apartments9[indexAp9].timeStamp] = apartments9[indexAp9].price;

  // console.log(apartments2[indexAp1]);
}
