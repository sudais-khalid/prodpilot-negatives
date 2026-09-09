const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.get("/version", (req, res) => res.json({ status: "ok" }));

app.listen(process.env.PORT);
