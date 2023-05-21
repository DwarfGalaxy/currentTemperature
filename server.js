const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

const partialsPath = path.join(__dirname, "views/partials");
const publicPath = path.join(__dirname, "public");

app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

// home page
app.get("/", (req, res) => {
    res.render("index");
});

// weather page
app.get("/weather", (req, res) => {
    res.render("weather");
});

app.listen(3000, () => {
    console.log("Listenig to the port number 3000");
})