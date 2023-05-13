import fs from "fs";

class HistogramGenerator {
  constructor(data, binCount) {
    this.data = data;
    this.binCount = binCount;
  }

  generateBins() {
    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const range = max - min;
    const binSize = range / this.binCount;

    const bins = Array.from({ length: this.binCount }, (_, index) => {
      const lowerBound = min + index * binSize;
      const upperBound = lowerBound + binSize;
      return { lowerBound, upperBound };
    });

    return bins;
  }

  generateHistogram() {
    const bins = this.generateBins();
    const histogram = bins.map((bin) => {
      const count = this.data.filter(
        (value) => value >= bin.lowerBound && value < bin.upperBound
      ).length;
      return { ...bin, count };
    });

    return histogram;
  }

  exportToCSV(filename) {
    const histogram = this.generateHistogram();
    const csvContent = [
      "Bin,Count",
      ...histogram.map((bin) =>
        [`${bin.lowerBound} - ${bin.upperBound}`, bin.count].join(",")
      ),
    ].join("\n");

    fs.writeFileSync(filename, csvContent);
  }
}

export default HistogramGenerator;
