import { Toaster } from "react-hot-toast";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import UsersDashboard from "./pages/UsersDashboard";
import RolesDashboard from "./pages/RolesDashboard";
import MasterDataDashboard from "./pages/MasterDataDashboard";
import AdminMainDashboard from "./pages/AdminMainDashboard";
import PayablesDashboard from "./pages/PayablesDashboard";

export default function App() {

  return (

    <>
     <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Admin Layout */}
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            {/* Default page */}
            <Route
              index
              element={
                <Navigate
                  to="dashboard"
                  replace
                />
              }
            />
            {/* Dashboard */}
            <Route
              path="dashboard"
              element={<AdminMainDashboard />}
            />
            {/* Users */}
            <Route
              path="users"
              element={<UsersDashboard />}
            />
            {/* Roles */}
            <Route
              path="roles"
              element={<RolesDashboard />}
            />
            {/* Master Data */}
            <Route
              path="master-data"
              element={<MasterDataDashboard />}
            />
            {/* Payables */}
            <Route
              path="payables"
              element={<PayablesDashboard />}
            />
          </Route>
          {/* Unknown URL */}
          <Route
            path="*"
            element={
              <Navigate
                to="/admin"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}