import { Typography, Image, Card, Space, Button } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/device.css";
import iconPen from "../../image/iconPen.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeviceData, fetchDevice } from "../../Redux/deviceSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";

function DetailsDevice() {
  const { id } = useParams<{ id: string }>();
  const [dataSelect, setDataSelect] = useState<DeviceData | null>(null);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const deviceData = useSelector((state: RootState) => state.device.device);
  useEffect(() => {
    dispatch(fetchDevice());
    const selectedData = deviceData.find((item) => item.id === id);
    setDataSelect(selectedData || null); // Nếu không tìm thấy, setEmailData thành null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
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
          Chi tiết thiết bị
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1550%" }}
        ></Image>
        <Link to={"/information"}>
          {" "}
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
        <div className="mt-4"></div>
        <Space>
          <Card style={{ width: "80%", height: "70vh" }}>
            <Typography.Text className="info-information">
              Thông tin thiết bị
            </Typography.Text>
            <br />
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Mã thiết bị:
              </Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.device}
              </Typography.Text>
              <div style={{ marginLeft: "400px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Loại thiết bị:
                </Typography.Text>
                <Typography.Text className="ms-4">
                  {dataSelect?.typeOfDevice}
                </Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Tên thiết bị:
              </Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.name}
              </Typography.Text>
              <div style={{ marginLeft: "405px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Tên đăng nhập:
                </Typography.Text>
                <Typography.Text className="ms-4">
                  {dataSelect?.userName}
                </Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Địa chỉ IP:
              </Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.address}
              </Typography.Text>
              <div style={{ marginLeft: "378px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Mật khẩu:{" "}
                </Typography.Text>
                <Typography.Text className="ms-4">
                  {dataSelect?.password}
                </Typography.Text>
              </div>
            </Space>
            <br />
            <div className="mt-3">
              <Typography.Text className="font-word">
                Dịch vụ sử dụng:
              </Typography.Text>
              <br />
              <div className="mt-2"></div>
              <Typography.Text>{dataSelect?.serviceUse}</Typography.Text>
            </div>
          </Card>
          <Button className="btn-orange">
            <Image src={iconPen} preview={false}></Image>
            <br />
            <Typography.Text className="text-orange">
              Cập nhật <br /> thiết bị
            </Typography.Text>
          </Button>
        </Space>
      </div>
    </div>
  );
}
export default DetailsDevice;
