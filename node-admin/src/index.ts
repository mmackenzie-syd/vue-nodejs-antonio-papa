require("dotenv").config();

import express from "express";
import { DataSource } from "typeorm";
import cors from "cors";
import { routes } from "./routes";

import { ORM_CONFIG } from "../ormconfig";
import cookieParser from "cookie-parser";

export const dataSource = new DataSource(ORM_CONFIG);

dataSource
  .initialize()
  .then((connection) => {
    console.log("Data Source has been initialized!");
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true, // to allow cookies
        origin: ["http://localhost:8080"],
      })
    );

    routes(app);

    app.listen(8000, () => {
      console.log("listening to port 8000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
