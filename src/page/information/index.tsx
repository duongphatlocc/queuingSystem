import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SlideMenu from "../../Component/menu";
import { Typography, Image, Input } from "antd";
import "../../css/info.css";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";

function Info() {
  // Truy xuất thông tin người dùng từ Redux Store
  const userInfo = useSelector((state: RootState) => state.users.currentUser);
  console.log(userInfo);
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
      <SlideMenu />
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
        <Typography.Text className="info-information">
          Thông tin cá nhân
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "2500%" }}
        ></Image>

        <div style={{ display: "inline", marginLeft: "68%" }}>
          <Image src={avatar} preview={false}></Image>
        </div>
        <Typography.Text
          style={{ position: "absolute", marginTop: "-6px", marginLeft: "5px" }}
          className="hi-info"
        >
          Xin chào
        </Typography.Text>

        <Typography.Text
          style={{ position: "absolute", marginTop: "20px", marginLeft: "5px" }}
          className="name-info"
        >
          {userInfo?.fullName}
        </Typography.Text>
      </div>
      <div className="bg-infor">
        <div className="bg-left-infor">
          <Image
            src={avatar}
            preview={false}
            style={{ width: "250px" }}
          ></Image>
          <br />
          <div className="mt-3"></div>
          <Typography.Text className="infor-name ms-4">
            {userInfo?.fullName}
          </Typography.Text>

          <div className="bg-between-infor">
            <Typography.Text className="text-infor">
              Tên người dùng
            </Typography.Text>
            <br />
            <Input
              className="input-infor mt-2"
              disabled
              value={userInfo?.fullName}
            />
            <br />
            <br />
            <Typography.Text className="text-infor">
              Số điện thoại
            </Typography.Text>
            <br />
            <Input
              className="input-infor mt-2"
              disabled
              value={userInfo?.phone}
            />
            <br />
            <br />
            <Typography.Text className="text-infor">Email:</Typography.Text>
            <br />
            <Input
              className="input-infor mt-2"
              value={userInfo?.email}
              disabled
            />
          </div>
          <div className="bg-right-infor">
            <Typography.Text className="text-infor">
              Tên đăng nhập
            </Typography.Text>
            <br />
            <Input
              className="input-infor mt-2"
              value={userInfo?.userName}
              disabled
            />
            <br />
            <br />
            <Typography.Text className="text-infor">Mật khẩu</Typography.Text>
            <br />
            <Input.Password
              className="input-infor mt-2"
              value={userInfo?.password}
              disabled
            />
            <br />
            <br />
            <Typography.Text className="text-infor">Vai trò:</Typography.Text>
            <br />
            <Input
              className="input-infor mt-2"
              value={userInfo?.role}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
