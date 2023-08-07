import { Typography, Image, Card, Space, Input, Button, Select } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import start from "../../image/start.svg";
import "../../css/user.css";
import "../../css/device.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import {
  UserData,
  fetchUser,
  loginSuccess,
  updateUser,
} from "../../Redux/userSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";

function AccountManagementUpdate() {
  const { id } = useParams(); // Get the user ID from the URL params
  const [dataSelect, setDataSelect] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const userData = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchUser());
    const selectedData = userData.find((item) => item.id === id);
    setDataSelect(selectedData || null); // Nếu không tìm thấy, setEmailData thành null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleFormSubmit = () => {
    if (dataSelect) {
      dispatch(updateUser(dataSelect));
      navigate(`/accountManagement`);
      // Add any additional logic or redirect to another page if needed after the update
    }
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
          />
        </Typography.Text>

        <Typography.Text className="text-title">
          Quản lý tài khoản
        </Typography.Text>
        <Image src={iconBigger} preview={false} style={{ marginTop: "-8px" }} />
        <Typography.Text className="info-information">
          Cập nhật tài khoản
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1450%" }}
        />
        <Link to={"/information"}>
          {" "}
          <div style={{ display: "inline", marginLeft: "40%" }}>
            <Image src={avatar} preview={false} />
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
        <Typography.Text className="device-title">
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
                  Họ tên:
                  <Image src={start} preview={false} />
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập họ tên"
                  value={dataSelect?.fullName}
                  onChange={(e) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Tên đăng nhập: <Image src={start} preview={false} />
                </Typography.Text>
                <br />
                <Input
                  value={dataSelect?.userName}
                  className="mt-2 input-add"
                  placeholder="Nhập tên đăng nhập"
                  onChange={(e) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      userName: e.target.value,
                    }))
                  }
                />
              </div>
              {/* ... (rest of the form fields) ... */}
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
                  value={dataSelect?.phone}
                  onChange={(e) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      phone: e.target.value,
                    }))
                  }
                ></Input>
              </div>
              <div style={{ marginLeft: "5%" }}>
                <Typography.Text className="font-word">
                  Mật khẩu: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input.Password
                  value={dataSelect?.password}
                  onChange={(e) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
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
                  value={dataSelect?.email}
                  onChange={(e) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
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
                  value={dataSelect?.rePassword}
                  onChange={(e) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      rePassword: e.target.value,
                    }))
                  }
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
                  value={dataSelect?.role}
                  onChange={(value) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      role: value,
                    }))
                  }
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
                  value={dataSelect?.activeStatus}
                  onChange={(value) =>
                    setDataSelect((prevData) => ({
                      ...prevData,
                      activeStatus: value,
                    }))
                  }
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
            {/* ... (rest of the card content) ... */}
          </Card>
          <Space className="two-button">
            <Button
              className="btn-cancel"
              onClick={() => navigate(`/accountManagement`)}
            >
              Hủy bỏ
            </Button>
            <Button className="btn-right-add" onClick={handleFormSubmit}>
              Cập nhật
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default AccountManagementUpdate;
