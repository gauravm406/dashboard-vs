import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import Analytics from "./models/analytics.js";
import axios from "axios";
import csv from "csv-parser";

dotenv.config();
connectToDatabase();

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  if (
    !day ||
    !month ||
    !year ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    console.warn(`Invalid date format: ${dateString}`);
    return null;
  }
  return new Date(year, month - 1, day);
};

const importData = async () => {
  try {
    await Analytics.deleteMany();
    console.log("Existing data cleared");

    const url =
      "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/gviz/tq?tqx=out:csv";

    const response = await axios.get(url, { responseType: "stream" });

    const rows = [];
    response.data
      .pipe(csv())
      .on("data", (row) => {
        const parsedDate = parseDate(row["Day"]);
        if (!parsedDate) {
          console.warn(
            `Skipping row with invalid date: ${JSON.stringify(row)}`
          );
          return;
        }

        rows.push({
          day: parsedDate,
          age: row["Age"],
          gender: row["Gender"].toLowerCase(),
          features: {
            A: Number(row["A"]),
            B: Number(row["B"]),
            C: Number(row["C"]),
            D: Number(row["D"]),
            E: Number(row["E"]),
            F: Number(row["F"]),
          },
        });
      })
      .on("end", async () => {
        if (rows.length > 0) {
          await Analytics.insertMany(rows);
          console.log("Data imported successfully!");
        } else {
          console.log("No valid data to import.");
        }
      });
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

if (process.argv[2] === "-d") {
} else {
  importData();
}
