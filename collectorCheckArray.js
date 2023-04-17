import collector from "./Collector_9.3.2023.json" assert { type: "json" };
const targetDateKey = "9.3.2023";

collector.forEach((item) => {
  if (!item.prices[targetDateKey]) {
    console.log(item);
  }
});
