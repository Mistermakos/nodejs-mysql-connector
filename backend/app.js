import express from "express"
import { router } from "./api/apiroutes.js";

let app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use("/api/v1", router)
export { app }