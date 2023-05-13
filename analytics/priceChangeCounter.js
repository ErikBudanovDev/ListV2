// priceChangeCounter.js

class PriceChangeCounter {
  countLoweredPrices(differenceArray) {
    return differenceArray.filter((object) => object.diff < 0).length;
  }

  countIncreasedPrices(differenceArray) {
    return differenceArray.filter((object) => object.diff > 0).length;
  }
}

export default PriceChangeCounter;
