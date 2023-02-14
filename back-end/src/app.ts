if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";

import { router } from "./router";

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// App setup
const app = express();
app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cors());

// Server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);

router(app, con);
