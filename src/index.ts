import express from "express";

import config from "./config";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

console.log(`Server listening on port: ${config.serverPort}`);

app.listen(config.serverPort);
