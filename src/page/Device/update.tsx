import { Typography, Image, Card, Space, Input, Button, Select } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import start from "../../image/start.svg";
import "../../css/device.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../Redux/store";
import { useEffect } from "react";
import { loginSuccess } from "../../Redux/userSlice";

function Update() {
  const navigate = useNavigate();
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
          Thiết bị{" "}
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
        </Typography.Text>

        <Typography.Text className="text-title">
          Danh sách thiết bị
        </Typography.Text>
        <Image
          src={iconBigger}
          preview={false}
          style={{ marginTop: "-8px" }}
        ></Image>
        <Typography.Text className="info-information">
          Cập nhật thiết bị
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1550%" }}
        ></Image>
        <Link to={".information"}>
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
          Quản lý thiết bị
        </Typography.Text>
        <div className="mt-4">
          <Card style={{ width: "75%", height: "62vh" }}>
            <Typography.Text className="info-information">
              Thông tin thiết bị
            </Typography.Text>
            <br />
            <Space className="mt-4">
              <div>
                <Typography.Text className="font-word">
                  Mã thiết bị: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập mã thiết bị"
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Loại thiết bị: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Select
                  className="input-add"
                  placeholder="Chọn loại thiết bị"
                  style={{ width: 530 }}
                  options={[
                    {
                      value: "Kiosk",
                      label: "Kiosk",
                    },
                    {
                      value: "Display counter",
                      label: "Display counter",
                    },
                  ]}
                />
              </div>
              {/*  */}
            </Space>
            <Space className="mt-2">
              <div>
                <Typography.Text className="font-word">
                  Tên thiết bị: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập tên thiết bị"
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Tên đăng nhập:: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập tài khoản"
                ></Input>
              </div>
            </Space>
            <Space className="mt-2">
              <div>
                <Typography.Text className="font-word">
                  Địa chỉ IP: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập địa chỉ IP"
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Mật khẩu:<Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập mật khẩu"
                ></Input>
              </div>
            </Space>
            <div className="mt-2">
              <Typography.Text className="font-word">
                Dịch vụ sử dụng: <Image src={start} preview={false}></Image>
              </Typography.Text>
              <br />
              <Input
                className="mt-2 input-add-1"
                placeholder="Nhập dịch vụ sử dụng"
              ></Input>
              <br />
              <div className="mt-3"></div>
              <Typography.Text>
                <Image src={start} preview={false} className=""></Image> Là
                trường thông tin bắt buộc
              </Typography.Text>
            </div>
          </Card>
          <Space className="two-button">
            <Button className="btn-cancel" onClick={() => navigate(`/devices`)}>
              Hủy bỏ
            </Button>
            <Button className="btn-right-add">Thêm thiết bị</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
export default Update;
