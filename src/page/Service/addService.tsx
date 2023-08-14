import { Typography, Image, Card, Space, Button, Checkbox } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import start from "../../image/start.svg";
import "../../css/device.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";
import TextArea from "antd/es/input/TextArea";
import { addService } from "../../Redux/test";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";

function AddService() {
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

  //
  const [serviceData2, setServiceData] = useState({
    code: "",
    description: "",
    name: "",
    autoIncrease: false,
    fromNumber: 0,
    toNumber: 0,
    activeStatus: "Hoạt động",
  });

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const handleAddService = () => {
    // Dispatch action Thunk để thêm dữ liệu vào Firebase
    dispatch(addService(serviceData2));
    navigate(`/services`);
  };

  // Xử lý sự kiện thay đổi giá trị của các trường nhập
  const handleChangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setServiceData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
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
            Dịch vụ{" "}
            <Image
              src={iconBigger}
              preview={false}
              style={{ marginTop: "-8px" }}
            ></Image>
          </Typography.Text>

          <Typography.Text className="text-title">
            Danh sách dịch vụ
          </Typography.Text>
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
          <Typography.Text className="info-information">
            Thêm dịch vụ
          </Typography.Text>
          <Image
            src={notification}
            preview={false}
            style={{ marginLeft: "1550%" }}
          ></Image>
          <Link to={"/information"}>
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
            Quản lý dịch vụ
          </Typography.Text>
          <div className="mt-4">
            <Card style={{ width: "75%", height: "62vh" }}>
              <Typography.Text className="info-information">
                Thông tin dịch vụ
              </Typography.Text>
              <br />
              <Space className="mt-2">
                <div>
                  <Typography.Text className="font-word">
                    Mã dịch vụ: <Image src={start} preview={false}></Image>
                  </Typography.Text>
                  <br />
                  <input
                    className="mt-2 input-add"
                    type="text"
                    name="code"
                    value={serviceData2.code}
                    onChange={handleChangeinput}
                    placeholder="Mã dịch vụ"
                  />
                </div>

                <div
                  style={{
                    top: "64px",
                    marginLeft: "2%",
                    position: "absolute",
                  }}
                >
                  <Typography.Text className="font-word">
                    Mô tả:
                  </Typography.Text>
                  <br />
                  <TextArea
                    style={{ width: 550 }}
                    rows={5}
                    placeholder="Mô tả dịch vụ"
                    name="description"
                    value={serviceData2.description}
                    onChange={handleChangeTextArea}
                  ></TextArea>
                </div>
                {/*  */}
              </Space>
              <div>
                <Typography.Text className="font-word">
                  Tên dịch vụ : <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <input
                  className="mt-2 input-add"
                  type="text"
                  name="name"
                  value={serviceData2.name}
                  onChange={handleChangeinput}
                  placeholder="Tên dịch vụ"
                />
              </div>
              <Typography.Text className="info-information">
                Thông tin dịch vụ
              </Typography.Text>
              <br />
              <Space>
                <input
                  type="checkbox"
                  name="autoIncrease"
                  checked={serviceData2.autoIncrease}
                  onChange={handleChangeinput}
                />
                Tăng tự động từ:
                <input
                  style={{ width: 50 }}
                  className=" input-add"
                  type="number"
                  name="fromNumber"
                  value={serviceData2.fromNumber}
                  onChange={handleChangeinput}
                  placeholder="Từ số"
                />
                <Typography.Text>đến</Typography.Text>
                <input
                  style={{ width: 50 }}
                  className=" input-add"
                  type="number"
                  name="toNumber"
                  value={serviceData2.toNumber}
                  onChange={handleChangeinput}
                  placeholder="Đến số"
                />
              </Space>
              <br />

              <Space className="mt-1">
                <Checkbox>Prefix:</Checkbox>
                <input
                  style={{ width: 50, marginLeft: "65px" }}
                  className=" input-add"
                ></input>
              </Space>
              <br />
              <Space className="mt-1">
                <Checkbox>Surfix:</Checkbox>
                <input
                  style={{ width: 50, marginLeft: "65px" }}
                  className=" input-add"
                ></input>
              </Space>
              <br />
              <Space className="mt-1">
                <Checkbox>Reset mỗi ngày</Checkbox>
              </Space>
              <br />
              <div className="mt-2"></div>
              <Typography.Text>
                <Image src={start} preview={false} className=""></Image> Là
                trường thông tin bắt buộc
              </Typography.Text>
            </Card>
            <Space className="two-button">
              <Button
                className="btn-cancel"
                onClick={() => navigate(`/services`)}
              >
                Hủy bỏ
              </Button>
              <Button className="btn-right-add" onClick={handleAddService}>
                Thêm dịch vụ
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddService;
