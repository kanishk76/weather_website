const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Kumar Kanishka",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kumar Kanishka",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Kumar Kanishka",
  });
});

function callback(error, { latitude, longitude, location }) {
  if (error) console.log(error);
  else forecast(longitude, latitude, callback2);
}

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send("ERROR please provide address");
  } else {
    /*res.send({
      forecast: "It is snowing",
      location: req.query.address,
    });*/
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) res.send(error);
        else {
          forecast(longitude, latitude, (error, data) => {
            if (error) res.send(error);
            else res.send(data);
          });
        }
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send("error");
  } else {
    res.send({
      products: [],
    });
    console.log(req.query);
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kumar Kanishka",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kumar Kanishka",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
