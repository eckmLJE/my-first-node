import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

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
  return res.send("GET HTTP method on user resource\n");
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
