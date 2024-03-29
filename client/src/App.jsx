import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./themes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import Layout from "./pages/layout/index";
import Products from "./pages/products/Products";
import Customers from "./pages/customers/Customers";
import Transactions from "./pages/transactions/Transactions";
import Geogaraphy from "./pages/geography/Geogaraphy";
import Overview from "./pages/overview/Overview";
import Daily from "./pages/daily/Daily";
import Monthly from "./pages/monthly/Monthly";
import Breakdown from "./pages/breakdown/Breakdown";
import Admins from "./pages/admin/Admins";
import Performance from "./pages/perFormance/Performance";
function App() {
  const mode = useSelector((state) => state.globalSlice.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geogaraphy />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admins />} />
              <Route path="/performance/" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
