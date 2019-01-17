import "dotenv/config";
import express from "express";
import cors from "cors";
import uuidv4 from "uuid/v4";
import bodyParser from "body-parser";

import models from "./models";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// fake auth

app.get("/session", (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

// user resource

app.get("/users", (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get("/users/:userId", (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource\n`);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!\n`)
);

// messages resource

app.get("/messages", (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});
