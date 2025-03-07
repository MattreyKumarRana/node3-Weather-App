// Using express
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// To use express, we use a variable to extract it
const app = express();

// Setup the configuration paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Using the handlebars library
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serving up HTML file
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mattrey",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Mattrey",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Mattrey",
    message:
      "This is the help page. I just want to say that Andrew Mead is a very good teacher. I love his teaching style and I am very much grateful to be learning the backend coding from him",
  });
});

// Creating a GET request
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        res.send({
          forecast: forecastData.message,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// Setting specific help error page
app.get("/help/*", (req, res) => {
  res.render("error", {
    code: 404,
    title: "Error",
    errorMessage: "Help article not found",
    name: "Mattrey",
  });
});

// Setting up 404 pages
app.get("*", (req, res) => {
  res.render("error", {
    code: 404,
    title: "Error",
    errorMessage: "Page not found",
    name: "Mattrey",
  });
});

// Starting the Server to listen to requests
app.listen(3000, () => {
  console.log("Server is up running on port 3000.");
});
