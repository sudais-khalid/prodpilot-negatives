const express = require("express");
const helmet = require("helmet");

const app = express();

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(process.env.PORT);
