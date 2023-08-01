import { Route, Routes } from "react-router-dom";
import Bglogin from "../login";
import ForgotPassword from "../login/forgotPassword";
import ResetPassword from "../login/resetPassword";
import Info from "../../page/information";
import Dashboard from "../../page/dashboard";
import LoadDataDevice from "../../page/Device/load";
import DetailsDevice from "../../page/Device/details";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Bglogin />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />}></Route>
      <Route path="/information" element={<Info />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/devices" element={<LoadDataDevice />}></Route>
      <Route path="/details" element={<DetailsDevice />}></Route>
    </Routes>
  );
}
export default AppRoutes;
