import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";
import Transaction from "../models/transactions.js";
import User from "../models/user.js";
import getCountryIso3 from "country-iso-2-to-3";
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    const productWithStats = await Promise.all(
      products?.map(async (prod) => {
        const stat = await ProductStat.find({ productId: prod._id });
        return {
          ...prod._doc,
          stat,
        };
      })
    );

    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    console.log(page, pageSize);
    const generateSort = () => {
      const sortParse = JSON.parse(sort);
      const sortFormated = {
        [sortParse.field]: (sortParse.sort = "asc" ? 1 : -1),
      };

      return sortFormated;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      cost: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mapLocation = users.reduce((acc, { country }) => {
      const countryIso3 = getCountryIso3(country);
      if (!acc[countryIso3]) {
        acc[countryIso3] = 0;
      }
      acc[countryIso3]++;
      return acc;
    }, {});

    const formettedLocation = Object.entries(mapLocation).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formettedLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
