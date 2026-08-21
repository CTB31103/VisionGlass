import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import CONSTANTS from "./constants";
import { Log } from "./utils";
import dotenv from "dotenv";
import Middleware from "./middleware";
import path from "path";
import { Routes } from "./routes";
import cors from "cors";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app: Application = express();
const port = 3000; // The port your express server will be running on.

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Package middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 Put your exact React app URL here
    credentials: true, // 👈 CRITICAL: Allows cookies to pass through CORS
  }),
);

// Custom middleware
app.use(Middleware.logging); // Adds server logs for incoming requests

// Routing
app.use("/api/media", Routes.MediaRoutes); // Image related endpoints

app.use("/api", Routes.APIKeyNeededRoutes);

app.all("/:all_other", (req, res) => res.status(404).send("Not Found"));

// Start the server
const mongoUri =
  CONSTANTS.database.mongo.uri +
  CONSTANTS.database.mongo.db +
  "?directConnection=true&serverSelectionTimeoutMS=2000&replicaSet=rs0";
mongoose
  .connect(mongoUri, { timeoutMS: 15000 })
  .then(() => {
    Log.colors.green(`Connected to MongoDB at ${mongoUri}`);
    app.listen(port, () => {
      Log.colors.greenSpace(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    Log.colors.redSpace("Failed to connect to MongoDB:", err);
  });
