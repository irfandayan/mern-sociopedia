import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet"; // set some security
import morgan from "morgan";

// Configurations
const __filename = fileURLToPath(import.meta.url); // Use this incase of type as module
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
