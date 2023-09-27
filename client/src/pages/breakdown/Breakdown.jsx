import { Box } from "@mui/material";
import Header from "../../component/Header";
import BreakDownChart from "../../component/BreakDownChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subTitle="Breakdown of sales by category" />
      <Box mt="40px" height="75vh">
        <BreakDownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
