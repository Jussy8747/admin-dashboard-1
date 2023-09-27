import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "../../component/Header";
import OverviewChart from "../../component/OverviewChart";
import { useState } from "react";
const Overview = () => {
  const [view, setView] = useState("units");
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Overview"
        subTitle="Overview of general revenue and profit"
      />
      <Box height="80vh">
        <FormControl sm={{ mt: "1rem" }}>
          <InputLabel>view</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>

        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
