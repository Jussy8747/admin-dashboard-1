import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import sales from "./routes/sales.js";
import management from "./routes/management.js";
import general from "./routes/general.js";
import client from "./routes/client.js";

// data import
import User from "./models/user.js";
import Product from "./models/product.js";
import ProductStat from "./models/productStat.js";
import Transaction from "./models/transactions.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
} from "./data/index.js";
// CONFIGURATION

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/client", client);
app.use("/general", general);
app.use("/management", management);
app.use("/sales", sales);

app.use(express.json);
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Route

// mongo

const Port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });

    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
  })
  .catch((err) => {
    console.log(`${err} did not connet`);
  });
