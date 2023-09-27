import user from "../models/user.js";
import OverallStat from "../models/overallStat.js";
import Transaction from "../models/transactions.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findOne({ _id: id });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const currentMonth = "November";
    const currentDay = "2021-11-16";
    const currentYear = "2021";

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      monthlyData,
      salesByCategory,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      monthlyData,
      salesByCategory,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
