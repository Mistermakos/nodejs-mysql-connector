import express from "express"
import router from "./Routes/routes.js";

const app = express();


app.use(express.json());
//Middleware 
app.use((req,res,next) => 
{
    req.db = db;
    next()
})


app.use("/", express.static("frontend"))
app.use("/api/v1", router)

export default app;