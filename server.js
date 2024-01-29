import express from "express";
import PriceAnalytics from "./analytics/Categorizer.js";
import { client } from "./util/mongoDBConnector.js";

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
  const dateNow = new Date;
  const dateFormatted = `${dateNow.getDay()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`;
  res.send(dateFormatted);
});

app.post("/analytics", async (req, res) => {
  let { constructionType, districtNum } = req.body;
  districtNum = parseInt(districtNum);
  const analytics = new PriceAnalytics({
    constructionType,
    timeStamp: "23-11-2023",
    districtNum,
    // floor,
    // renovation,
  });
  try {
    const resp = await analytics.performAnalysis();
    const monthlyAveragePrices =
      await analytics.calculateMonthlyAveragePrices();
    res.status(200).send({ resp, monthlyAveragePrices });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  } finally {
    // Close the client after both methods have been called
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
