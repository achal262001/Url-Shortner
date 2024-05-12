const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
const local_url = "mongodb://127.0.0.1:27017/achal";
const global_url =
  "mongodb+srv://AchalKokatanoor:Achal2001@dental-website.7fmchbg.mongodb.net/";
mongoose.connect(global_url);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected");
});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

// its new comment, it's for my practice
app.listen(process.env.Port || 5000, () => {
  console.log("server listing at 5000");
});
