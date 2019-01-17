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

// user resource

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource\n");
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource\n`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource\n`);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!\n`)
);

// messages resource

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  };

  messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});
