import { Button, Image, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../../image/logo.svg";
import iconDashboard from "../../image/iconDashboard.svg";
import iconDevice from "../../image/iconDevice.svg";
import iconServices from "../../image/iconServices.svg";
import iconLevels from "../../image/iconLevels.svg";
import iconReport from "../../image/iconReport.svg";
import setting from "../../image/setting.svg";
import iconLogout from "../../image/iconLogout.svg";
import iconDots from "../../image/iconDots.svg";
const { SubMenu } = Menu;

function SideMenu() {
  return (
    <div className="side-menu-container">
      <div className="menu-bg-left">
        <Image
          src={logo}
          preview={false}
          style={{ width: "55%", marginLeft: "40%", marginTop: "20%" }}
        />
        <div className="mt-5"></div>
        <Menu className="side-menu">
          <Menu.Item key="dashboard" className="item">
            <Link to="/dashboard">
              {" "}
              <Image src={iconDashboard} preview={false} />
              <Typography.Text className="ms-2 text">Dashboard</Typography.Text>
            </Link>
          </Menu.Item>
          <Menu.Item key="devices">
            <Link to="/devices">
              {" "}
              <Image src={iconDevice} preview={false} />
              <Typography.Text className="ms-2 text">Thiết bị</Typography.Text>
            </Link>
          </Menu.Item>
          <Menu.Item key="services">
            <Link to="/services">
              {" "}
              <Image src={iconServices} preview={false} />
              <Typography.Text className="ms-2 text">Dịch vụ</Typography.Text>
            </Link>
          </Menu.Item>
          <Menu.Item key="levels">
            <Link to="/levels">
              {" "}
              <Image src={iconLevels} preview={false} />
              <Typography.Text className="ms-2 text">Cấp số</Typography.Text>
            </Link>
          </Menu.Item>
          <Menu.Item key="reports">
            <Link to="/reports">
              {" "}
              <Image src={iconReport} preview={false} />
              <Typography.Text className="ms-2 text">Báo cáo</Typography.Text>
            </Link>
          </Menu.Item>
          {/* Add SubMenu for "Cài đặt hệ thống" */}
          <SubMenu
            key="settings"
            title={
              <span>
                {" "}
                <Image src={setting} preview={false} />
                <Typography.Text className="ms-2 text">
                  Cài đặt hệ thống
                </Typography.Text>
                <Image src={iconDots} preview={false} className="ps-2"></Image>
              </span>
            }
          >
            <Menu.Item key="roleManagement">
              <Link to="/roleManagement">Quản lý vai trò</Link>
            </Menu.Item>
            <Menu.Item key="accountManagement">
              <Link to="/accountManagement">Quản lý tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="userLog">
              <Link to="/userLog">Nhật ký người dùng</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <div>
          <Button className="logout">
            <div className="button-logout-ml">
              <Image src={iconLogout} preview={false} />{" "}
              <Typography.Text className="text-logout">
                Đăng xuất
              </Typography.Text>
            </div>
          </Button>
        </div>
      </div>
      <div className="info-bg-right"> </div>
    </div>
  );
}

export default SideMenu;
