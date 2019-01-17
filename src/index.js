import "dotenv/config";
import express from "express";
import cors from "cors";
import uuidv4 from "uuid/v4";
import bodyParser from "body-parser";

import models from "./models";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// custom middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
});

// root URI

app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method\n");
});

app.post("/", (req, res) => {
  return res.send("Received a POST HTTP method\n");
});

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method\n");
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method\n");
});
