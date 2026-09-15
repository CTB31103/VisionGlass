import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import CONSTANTS from "./constants";
import { Log } from "./utils";
import dotenv from "dotenv";
import Middleware from "./middleware";
import path from "path";
import { Routes } from "./routes";
import cors from "cors";
import { connectDB } from "./connectDb";
import { createAdmin } from "./scripts";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app: Application = express();
const port = CONSTANTS.network.port(); // The port your express server will be running on.

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Package middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: CONSTANTS.network.clientUrl(), // 👈 Put your exact React app URL here
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
if (process.env.NODE_ENV !== "test") {
  (async () => {
    const connected = await connectDB();
    if (!connected) return;

    app.listen(port, () => {
      Log.colors.greenSpace(
        `Server is running on ${CONSTANTS.network.apiUrl()}`,
      );
    });
  })();
}
