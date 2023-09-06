import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";
import Transaction from "../models/transactions.js";
import User from "../models/user.js";
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
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
