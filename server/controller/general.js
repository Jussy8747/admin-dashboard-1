import user from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findOne({ _id: id });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
