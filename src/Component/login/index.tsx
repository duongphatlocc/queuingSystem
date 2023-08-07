import { Button, Image, Input, Typography } from "antd";
import logo from "../../image/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import people from "../../image/people.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserData, fetchUser, loginSuccess } from "../../Redux/userSlice";
import { RootState } from "../../Redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";

function Bglogin() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    dispatch(fetchUser() as any);
  }, [dispatch]);

  const handleLogin = () => {
    if (loading) {
      console.log("Đang tải dữ liệu...");
      return;
    }

    const user = users.find(
      (u) => u.userName === userName && u.password === password
    );

    if (user) {
      // Nếu tìm thấy người dùng, thực hiện dispatch loginSuccess để cập nhật state
      dispatch(loginSuccess(user));
      // Sau đó chuyển hướng đến trang thông tin
      navigate("/information");
    } else {
      setPassword("");
      setUserName("");
      // Nếu không tìm thấy người dùng, hiển thị thông báo lỗi
      console.log("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div>
      <div>
        <div className=" bg-left-login">
          <Image src={logo} preview={false} className="image-logo"></Image>
          <div className="form-input-login">
            <Typography.Text className="font-login">
              Tên đăng nhập *
            </Typography.Text>
            <br />
            <Input
              className="input-login"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <div className="mt-3"></div>
            <Typography.Text className="font-login">Mật khẩu *</Typography.Text>
            <br />
            <Input.Password
              className="input-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <Link className="font-text-forgot-password" to="/forgotPassword">
              Quên mật khẩu?
            </Link>
            <br />
            <Button className="mt-4 button-login" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
        </div>
        <div className=" bg-right-login">
          <Image src={people} preview={false} className="login-people"></Image>
          <div className="login-text-right">
            <Typography.Text className="login-text-1">Hệ thống</Typography.Text>
            <br />
            <Typography.Text className="login-text-2">
              QUẢN LÝ XẾP HÀNG
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bglogin;
