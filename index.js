const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose=require('mongoose')
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.options('*',cors())

// midleware
app.use(bodyParser.json())


// routes
const userRoute=require("./routes/userRoute");
const bannerRoute=require("./routes/bannerRoute");
const propertyRoute=require("./routes/propertyRoute");

const dbConnect = require("./config/dbConnect");

app.get("/", (req, res) => res.send("eccomerce server is running..."));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/property", propertyRoute);


// server connect
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected and listing on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });