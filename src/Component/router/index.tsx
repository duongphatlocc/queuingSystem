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
import AddService from "../../page/Service/addService";
import ServiceDetails from "../../page/Service/deitals";
import UpdateService from "../../page/Service/updateService";
import AddLevel from "../../page/Levels/addLevel";
import DetailsLevel from "../../page/Levels/details";
import LoadReport from "../../page/Report/load";
import LoadRole from "../../page/Role/load";
import AddRole from "../../page/Role/add";
import UpdateRole from "../../page/Role/update";
import LoadDiary from "../../page/Diary/load";

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
      <Route path="/update/:id" element={<Update />}></Route>
      <Route path="/services" element={<LoadDataService />}></Route>
      <Route path="/addServices" element={<AddService />}></Route>
      <Route path="/detailsService/:id" element={<ServiceDetails />} />
      <Route path="/updateService/:id" element={<UpdateService />} />
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
      <Route path="/addLevel" element={<AddLevel />}></Route>
      <Route path="/detailsLevel/:id" element={<DetailsLevel />} />
      <Route path="/reports" element={<LoadReport />}></Route>
      <Route path="/roleManagement" element={<LoadRole />}></Route>
      <Route path="/addRole" element={<AddRole />}></Route>
      <Route path="/updateRole/:id" element={<UpdateRole />}></Route>
      <Route path="/userLog" element={<LoadDiary />}></Route>
    </Routes>
  );
}
export default AppRoutes;
