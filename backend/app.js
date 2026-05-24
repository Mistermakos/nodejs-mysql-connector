import express from "express"
import { router } from "./api/apiroutes.js";

let app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)
export { app }