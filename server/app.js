import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { router } from "./routes.js";
import mysql from 'mysql2/promise';

let connection;

try {
  connection = await mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'PTREDDIT',
  });
} catch (err) {
  console.error("DB connection error:", err);
  process.exit(1);
}

global.db = connection;

const app = express();

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", router);

export default app;
