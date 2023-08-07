import { Typography, Image, Card, Space, Input, Button, Select } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import start from "../../image/start.svg";
import "../../css/user.css";
import "../../css/device.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserData, addUser, loginSuccess } from "../../Redux/userSlice";
import store, { RootState } from "../../Redux/store";

function AccountManagementAdd() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const dispatch: any = useDispatch();
  const handleCreateUser = () => {
    const userData: UserData = {
      userName,
      fullName,
      phone,
      email,
      role,
      activeStatus,
      password,
      rePassword,
    };
    dispatch(addUser(userData))
      .then((action: any) => {
        console.log(userData);
      })
      .catch((error: any) => {
        console.log("Error saving data:", error);
      });
    console.log(userData);
    navigate(`/accountManagement`);
  };
  const userInfo = useSelector((state: RootState) => state.users.currentUser);
  useEffect(() => {
    // Kiểm tra xem có dữ liệu người dùng trong Local Storage không
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Nếu có, dispatch action loginSuccess để cập nhật dữ liệu người dùng vào Redux Store
      store.dispatch(loginSuccess(parsedUser));
    }
  }, []);

  return (
    <div>
      <SideMenu />
      <div
        style={{
          position: "relative",
          zIndex: "1",
          width: "80%",
          height: "90px",

          top: "-730px",
          left: "17%",
        }}
      >
        <Typography.Text className="text-title">
          Cài đặt hệ thống{" "}
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
        </Typography.Text>

        <Typography.Text className="text-title">
          Quản lý tài khoản
        </Typography.Text>
        <Image
          src={iconBigger}
          preview={false}
          style={{ marginTop: "-8px" }}
        ></Image>
        <Typography.Text className="info-information">
          Thêm tài khoản
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1550%" }}
        ></Image>
        <Link to={"/information"}>
          {" "}
          <div style={{ display: "inline", marginLeft: "43%" }}>
            <Image src={avatar} preview={false}></Image>
          </div>
          <Typography.Text
            style={{
              position: "absolute",
              marginTop: "-6px",
              marginLeft: "5px",
            }}
            className="hi-info"
          >
            Xin chào
          </Typography.Text>
          <Typography.Text
            style={{
              position: "absolute",
              marginTop: "20px",
              marginLeft: "5px",
            }}
            className="name-info"
          >
            {userInfo?.fullName}
          </Typography.Text>
        </Link>
      </div>

      <div className="device-content">
        <Typography.Text className="device-title ">
          Quản lý tài khoản
        </Typography.Text>

        <div className="mt-4">
          <Card style={{ width: "75%", height: "62vh" }}>
            <Typography.Text className="info-information">
              Thông tin tài khoản
            </Typography.Text>
            <br />
            <Space className="mt-4">
              <div>
                <Typography.Text className="font-word">
                  Họ tên:<Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập họ tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Tên đăng nhập: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập tên đăng nhập"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></Input>
              </div>
              {/*  */}
            </Space>
            <Space className="mt-2">
              <div>
                <Typography.Text className="font-word">
                  Số điện thoại <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Mật khẩu: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 input-add"
                ></Input.Password>
              </div>
            </Space>
            <Space className="mt-2">
              <div>
                <Typography.Text className="font-word">
                  Email <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 input-add"
                  placeholder="Nhập email"
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Nhập lại mật khẩu<Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input.Password
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="mt-2 input-add"
                ></Input.Password>
              </div>
            </Space>
            <Space className="mt-4">
              <div>
                <Typography.Text className="font-word">
                  Vai trò <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Select
                  className="input-add"
                  placeholder="Chọn vai trò"
                  style={{ width: 530 }}
                  value={role}
                  onChange={(value) => setRole(value)}
                  options={[
                    {
                      value: "Kế toán",
                      label: "Kế toán",
                    },
                    {
                      value: "Quản lý",
                      label: "Quản lý",
                    },
                    {
                      value: "Admin",
                      label: "Admin",
                    },
                  ]}
                />
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Tình trạng <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Select
                  className="input-add"
                  placeholder="Chọn loại thiết bị"
                  style={{ width: 530 }}
                  value={activeStatus}
                  onChange={(value) => setActiveStatus(value)}
                  options={[
                    {
                      value: "Ngưng hoạt động",
                      label: "Ngưng hoạt động",
                    },
                    {
                      value: "Hoạt động",
                      label: "Hoạt động",
                    },
                  ]}
                />
              </div>
              {/*  */}
            </Space>
          </Card>
          <Space className="two-button">
            <Button
              className="btn-cancel"
              onClick={() => navigate(`/accountManagement`)}
            >
              Hủy bỏ
            </Button>
            <Button className="btn-right-add" onClick={handleCreateUser}>
              Thêm
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
export default AccountManagementAdd;
