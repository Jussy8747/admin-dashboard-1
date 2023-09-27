import FlexBetween from "../../component/flexBetween";
import Header from "../../component/Header";
import {
  DownloadOutlined,
  Email,
  Traffic,
  PersonAdd,
  PointOfSale,
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakDownChart from "../../component/BreakDownChart";
import OverviewChart from "../../component/OverviewChart";
import { useGetDashboardStatsQuery } from "../../slices/globalSliceApi";
import StatBox from "../../component/StatBox";
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardStatsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreateAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },

    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subTitle="welcome to your dashbaord" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              Color: theme.palette.secondary.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="10px"
        sx={{
          "& div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Customer"
          value={data && data.totalCustomers}
          increase="+14%"
          discription="Since Last Month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Sales today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          discription="Since Last Month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isdashboard={true} />
        </Box>

        <StatBox
          title="Month Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          discription="Since Last Month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Yeraly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          discription="Since Last Month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.4rem"
          borderRadius=".55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakDownChart isDashboard={true} />
          <Typography
            p="0 0.5rem"
            fontSize="0.7rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of Informations via category for revenue
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
