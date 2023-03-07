// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import cors from "cors";
import { MongoClient } from "mongodb";
import userRouter from "./routes/user.routes.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//connection

const MONGO_URL = process.env.MONGO_URL;
// console.log(MONGO_URL);
const client = new MongoClient(MONGO_URL); // dial
await client.connect(); // calling
console.log("Mongo is Connected");

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

// create user signup api
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
