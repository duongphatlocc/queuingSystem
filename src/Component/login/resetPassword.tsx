import { Button, Image, Input, Typography } from "antd";
import logo from "../../image/logo.svg";
import "../../css/forgotPassword.css";
import forgotPassword from "../../image/forgotPassword.svg";
function ResetPassword() {
  return (
    <div>
      <div className=" bg-left-login">
        <Image src={logo} preview={false} className="image-logo"></Image>
        <div className="form-input-login">
          <Typography.Text className="reset-password">
            Đặt lại mật khẩu mới
          </Typography.Text>
          <br />
          <Typography.Text className="font-login">Mật khẩu</Typography.Text>
          <br />
          <Input.Password className="input-login"></Input.Password>
          <br />
          <div className="mt-3"></div>
          <Typography.Text className="font-login">
            Nhập lại mật khẩu{" "}
          </Typography.Text>
          <br />
          <Input.Password
            className="input-login"
            type="password"
          ></Input.Password>
          <br />

          <Button className="mt-4 button-login">Xác nhận</Button>
        </div>
      </div>
      <div className=" bg-right-login">
        <Image
          src={forgotPassword}
          preview={false}
          className="forgot-password-people"
        ></Image>
      </div>
    </div>
  );
}
export default ResetPassword;
