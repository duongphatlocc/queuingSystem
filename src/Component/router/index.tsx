import { Route, Routes } from "react-router-dom";
import Bglogin from "../login";
import ForgotPassword from "../login/forgotPassword";
import ResetPassword from "../login/resetPassword";
import Info from "../../page/information";
import Dashboard from "../../page/dashboard";
import LoadDataDevice from "../../page/Device/load";
import DetailsDevice from "../../page/Device/details";
import AltaAddsDevice from "../../page/Device/add";
import Update from "../../page/Device/update";
import LoadDataService from "../../page/Service/load";
import AccountManagement from "../../page/User/accountManagement";
import AccountManagementAdd from "../../page/User/accountManagementAdd";
import AccountManagementUpdate from "../../page/User/accountManagementUpdate";
import LoadLeveL from "../../page/Levels/loadLevel";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Bglogin />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />}></Route>
      <Route path="/information" element={<Info />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/devices" element={<LoadDataDevice />}></Route>
      <Route path="/details/:id" element={<DetailsDevice />} />
      <Route path="/add" element={<AltaAddsDevice />}></Route>
      <Route path="/update" element={<Update />}></Route>
      <Route path="/services" element={<LoadDataService />}></Route>
      <Route path="/accountManagement" element={<AccountManagement />}></Route>
      <Route
        path="/accountManagementAdd"
        element={<AccountManagementAdd />}
      ></Route>
      <Route
        path="/accountManagementUpdate/:id"
        element={<AccountManagementUpdate />}
      />
      <Route path="/levels" element={<LoadLeveL />}></Route>
    </Routes>
  );
}
export default AppRoutes;
