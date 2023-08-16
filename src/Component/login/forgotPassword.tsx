import { useState } from "react";
import { Button, Input, Typography, message } from "antd";
import logo from "../../image/logo.svg";
import forgotPassword from "../../image/forgotPassword.svg";
import "../../css/forgotPassword.css";
import { db } from "../../Redux/firebase";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const history = useNavigate(); // Initialize useHistory

  const handleResetPassword = async () => {
    try {
      const userSnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        message.error("Email not found");
        return;
      }

      // Redirect to reset password page
      history(`/resetPassword?email=${email}`);
    } catch (error) {
      console.error("Error checking email:", error);
      message.error("An error occurred");
    }
  };

  return (
    <div>
      <div className=" bg-left-login">
        <img src={logo} alt="Logo" className="image-logo" />
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
          <Input
            className="input-login"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <br />

          <Button className="button-forgot-password-cancel">Hủy</Button>
          <Button
            className="mt-4 button-forgot-password-next"
            onClick={handleResetPassword}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
      <div className="bg-right-login">
        <img
          src={forgotPassword}
          alt="Forgot Password"
          className="forgot-password-people"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
