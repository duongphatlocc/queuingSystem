import { useState, useEffect } from "react";
import { Button, Input, Typography, message } from "antd";
import { db } from "../../Redux/firebase";
import logo from "../../image/logo.svg";
import "../../css/forgotPassword.css";
import forgotPassword from "../../image/forgotPassword.svg";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emailFromUrl, setEmailFromUrl] = useState("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlEmail = urlParams.get("email");
    if (urlEmail) {
      setEmailFromUrl(urlEmail);
    }
  }, []);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmNewPassword) {
      message.error("Mật khẩu không khớp");
      return;
    }

    if (!emailFromUrl) {
      message.error("Không tìm thấy địa chỉ email");
      return;
    }

    try {
      const userSnapshot = await db
        .collection("users")
        .where("email", "==", emailFromUrl)
        .get();

      if (!userSnapshot.empty) {
        const userId = userSnapshot.docs[0].id;

        await db.collection("users").doc(userId).update({
          password: newPassword, // Thay 'password' bằng tên trường mật khẩu thực tế trong tài liệu người dùng của bạn
        });

        message.success("Cập nhật mật khẩu thành công");
      } else {
        message.error("Không tìm thấy người dùng với địa chỉ email này");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      message.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div>
      <div className=" bg-left-login">
        <img src={logo} alt="Logo" className="image-logo" />
        <div className="form-input-login">
          <br />
          <br />
          <Typography.Text className="reset-password">
            Đặt lại mật khẩu mới
          </Typography.Text>
          <br />
          <Typography.Text className="font-login">Mật khẩu mới</Typography.Text>
          <br />
          <Input.Password
            className="input-login"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <Typography.Text className="font-login">
            Nhập lại mật khẩu mới{" "}
          </Typography.Text>
          <br />
          <Input.Password
            className="input-login"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <br />

          <Button className="mt-4 button-login" onClick={handlePasswordReset}>
            Xác nhận
          </Button>
        </div>
      </div>
      <div className=" bg-right-login">
        <img
          src={forgotPassword}
          alt="Forgot Password"
          className="forgot-password-people"
        />
      </div>
    </div>
  );
}

export default ResetPassword;
