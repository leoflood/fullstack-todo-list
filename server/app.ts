import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { router } from "./router";

// App setup
const app = express();
app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);

router(app);
