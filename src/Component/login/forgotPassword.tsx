import { Button, Image, Input, Typography } from "antd";
import logo from "../../image/logo.svg";
import "../../css/forgotPassword.css";
import forgotPassword from "../../image/forgotPassword.svg";

function ForgotPassword() {
  return (
    <div>
      <div className=" bg-left-login">
        <Image src={logo} preview={false} className="image-logo"></Image>
        <div className="form-input-login">
          <br />
          <br />
          <Typography.Text className="forgot-password-text-1">
            Đặt lại mật khẩu
          </Typography.Text>

          <div className="mt-3"></div>
          <Typography.Text className="forgot-password-text-2">
            Vui lòng nhập email để đặt lại mật khẩu của bạn *
          </Typography.Text>

          <br />
          <Input className="input-login"></Input>
          <br />

          <br />

          <Button className=" button-forgot-password-cancel" >Hủy</Button>
          <Button className="mt-4 button-forgot-password-next">Tiếp tục</Button>
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
export default ForgotPassword;
