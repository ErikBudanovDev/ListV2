export function removeDuplicates(array) {
  const uniqueObjects = [];

  return array.filter((obj) => {
    // Convert the object to a string using JSON.stringify for comparison purposes
    const objStr = JSON.stringify(obj);
    if (uniqueObjects.includes(objStr)) {
      return false;
    } else {
      uniqueObjects.push(objStr);
      return true;
    }
  });
}
export function hasDuplicates(array) {
  const seen = new Set();

  for (const item of array) {
    // Create a unique identifier by converting the object to a string
    const identifier = JSON.stringify(item);

    // Check if the identifier is already in the 'seen' set
    if (seen.has(identifier)) {
      // If it is, the array has duplicates
      return true;
    }

    // Add the identifier to the 'seen' set
    seen.add(identifier);
  }

  // If the loop completes, the array has no duplicates
  return false;
}
