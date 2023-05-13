// priceStatistics.js

class PriceStatistics {
  constructor() {}

  calculateIQR(values) {
    values.sort((a, b) => a - b);
    const q1 = values[Math.floor(values.length * 0.25)];
    const q3 = values[Math.floor(values.length * 0.75)];
    const iqr = q3 - q1;
    return { q1, q3, iqr };
  }

  calculateAverage(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }

  calculateMedian(values) {
    if (values.length === 0) return 0;

    values.sort((a, b) => a - b);

    const half = Math.floor(values.length / 2);

    if (values.length % 2) {
      return values[half];
    } else {
      return (values[half - 1] + values[half]) / 2.0;
    }
  }

  calculateMode(values) {
    if (values.length === 0) return null;

    const valueCounts = {};
    let modeValue = values[0];
    let maxCount = 1;

    for (const value of values) {
      if (valueCounts[value] == null) {
        valueCounts[value] = 1;
      } else {
        valueCounts[value]++;
      }

      if (valueCounts[value] > maxCount) {
        modeValue = value;
        maxCount = valueCounts[value];
      }
    }

    return modeValue;
  }
}

export default PriceStatistics;
