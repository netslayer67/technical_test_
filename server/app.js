const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const productRoutes = require("./routes/product");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGO_URI;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
