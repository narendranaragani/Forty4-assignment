import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./UserRoutes/userRoute.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json())
app.use("/api", router);

const PORT = process.env.PORT || 7000;
const mongo_uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://narilucky4_db_user:9GbSY3G2ufuwPtL0@cluster0.qnh9emm.mongodb.net/?appName=Cluster0";

mongoose
  .connect(mongo_uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("MongoDB connected successfully!!!");
  })
  .catch((err) => {
    console.log("Failed to connect mongoDB!!!",err);
  });
