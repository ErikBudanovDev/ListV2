import lastMonthAppartmentsRaw from "./RAW_Data/apartments_9.3.2023.json" assert { type: "json" };
import currentMonthAppartmentRaw from "./test1_19.3.2023.json" assert { type: "json" };

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
console.log(`Number of new objects: ${result.newObjectsCount}`);
console.log(
  `Number of objects in old array but not in new array: ${result.oldObjectsCount}`
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
