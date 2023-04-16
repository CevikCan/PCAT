const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const methodOverride = require("method-override");
const Photo = require("./models/Photo");
const PhotoController = require("./controllers/PhotoController");
const PageController = require("./controllers/PageController");

const app = express();

// Connect DB
mongoose.connect("mongodb+srv://can:aMr36acwrdke3M13@cluster0.n5eeyuo.mongodb.net/pcat-test-db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ["POST","GET"]
}));

app.get("/", PhotoController.getAllPhoto);
app.get("/photos/:id", PhotoController.getPhoto);
app.post("/photos", PhotoController.createPhoto);
app.put("/photos/:id", PhotoController.editPhoto);
app.delete("/photos/:id", PhotoController.deletePhoto);

app.get("/photos/edit/:id", PageController.getEditPage);

app.get("/about", PageController.getAboutPage);

app.get("/add", PageController.getAddPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Sunucu başarıyla çalıştırıldı");
});
