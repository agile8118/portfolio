const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
const publicPath = path.join(__dirname, "/public");
const port = process.env.PORT || 2045;

app.use(helmet());
app.use(compression());
app.use(express.static(publicPath));
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

// Show the home page
app.get("/", (req, res) => {
  res.sendFile("home.html", { root: __dirname + "/public" });

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const year = date.toISOString().slice(0, 4);
  const day = Number(date.toISOString().slice(8, 10));
  const month = monthNames[date.getMonth()];
  console.log(
    `Someone from ip address ${ip} has visited the page on ${month} ${day}, ${year}.`
  );
});

app.post("/contact", (req, res) => {
  const message = req.body.message;
  const name = req.body.name;
  const email = req.body.email;
  res.status(200).send({ message: "success" });
});

// Send 404 page
app.get("*", (req, res) => {
  res.sendFile("404.html", { root: __dirname + "/public" });
});

const server = app.listen(port, "127.0.0.1", () => {
  console.log("Server is on port " + port);
});
