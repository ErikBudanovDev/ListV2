import express from "express";
import PriceAnalytics from "./analytics/Categorizer.js";
const app = express();
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/analytics", async (req, res) => {
  let { constructionType, timeStamp, districtNum, floor } = req.body;
  console.log("Received request:", req.body);
  districtNum = parseInt(districtNum);
  const analytics = new PriceAnalytics({
    constructionType,
    timeStamp,
    districtNum,
    floor,
  });
  const resp = await analytics.performAnalysis();
  const monthlyAveragePrices = await analytics.calculateMonthlyAveragePrices();

  // res.send(resp, );
  res.status(200).send(monthlyAveragePrices);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
