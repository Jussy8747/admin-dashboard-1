import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../slices/globalSliceApi";
import Header from "../../component/Header";
import DataGridCustomeToolbar from "../../component/DataGridCustomeToolbar";
import { useTheme, Box} from "@emotion/react";
const Transactions = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setsort] = useState({});
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log(data);
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
    headerName: "£ of product",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length
  },
  
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `${Number(params.value).toFixed(2)}`
  },
];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire List Of Transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },

          "& .MuiDataGrid-Cell": {
            borderBottom: "none",
          },

          "& .MuiDataGrid-colunmHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainers": {
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
          rowCount={(data && data.total)}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPaginationModelChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setsort(...newSortModel)}
          components={Toolbar: DataGridCustomeToolbar}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
