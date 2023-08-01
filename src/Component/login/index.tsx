import { Button, Image, Input, Typography } from "antd";
import logo from "../../image/logo.svg";
import { Link } from "react-router-dom";
import people from "../../image/people.svg";

function Bglogin() {
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
            <Input className="input-login" />
            <br />
            <div className="mt-3"></div>
            <Typography.Text className="font-login">Mật khẩu *</Typography.Text>
            <br />
            <Input.Password className="input-login" />

            <br />
            <Link className="font-text-forgot-password" to="/forgotPassword">
              Quên mật khẩu?
            </Link>
            <br />
            <Button className="mt-4 button-login">Đăng nhập</Button>
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
