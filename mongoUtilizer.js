import fs from "fs";
import { connectClient, client } from "./util/mongoDBConnector.js"; // Import connectClient and client from your MongoDB setup file

// Read the JSON file
import apartmentData from "./Collectors/Collector_22_cleaned.json" assert { type: "json" };

async function insertApartments() {
  try {
    await connectClient();
    console.log("Connected to MongoDB!");
    const db = client.db("ApartmentListingsCluster");
    const apartments = db.collection("Apartments");

    // Map the apartment data to include a unique ID (uniqueId) made from apartmentID and region
    const mappedData = apartmentData.map((apartment) => ({
      ...apartment,
      uniqueId: `${apartment.apartmentID}-${apartment.region}`,
    }));

    // Insert the mapped data into the Apartments collection
    const result = await apartments.insertMany(mappedData);
    console.log(
      `Inserted ${result.insertedCount} documents into the collection`
    );
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await client.close();
  }
}

insertApartments().catch(console.dir);
