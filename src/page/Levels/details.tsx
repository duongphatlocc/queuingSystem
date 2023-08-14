import { Typography, Image, Card, Space, Button } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/device.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import iconBack from "../../image/iconBack.svg";
import { LevelData, fetchLevel } from "../../Redux/levelSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import dotBlue from "../../image/dotBlue.svg";
import dotRed from "../../image/dotRed.svg";
import dotGray from "../../image/dotGray.svg";

function DetailsLevel() {
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
  const { id } = useParams<{ id: string }>();
  const [dataSelect, setDataSelect] = useState<LevelData | null>(null);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const levelData = useSelector((state: RootState) => state.levels.levels);
  useEffect(() => {
    dispatch(fetchLevel());
    const selectedData = levelData.find((item) => item.id === id);
    setDataSelect(selectedData || null);
  }, [dispatch]);
  const navigate = useNavigate();
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
          Danh sách cấp số
        </Typography.Text>
        <Image
          src={iconBigger}
          preview={false}
          style={{ marginTop: "-8px" }}
        ></Image>
        <Typography.Text className="info-information">Chi tiết</Typography.Text>
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
          Quản lý cấp số
        </Typography.Text>
        <div className="mt-4"></div>
        <Space>
          <Card style={{ width: "80%", height: "70vh" }}>
            <Typography.Text className="info-information">
              Thông tin cấp số
            </Typography.Text>
            <br />
            <Space className="mt-3">
              <Typography.Text className="font-word">Họ tên:</Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.name}
              </Typography.Text>
              <div style={{ marginLeft: "370px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Nguồn cấp:
                </Typography.Text>
                <Typography.Text className="ms-4">
                  {dataSelect?.powerSupply}
                </Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Tên dịch vụ:
              </Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.nameService}
              </Typography.Text>
              <div style={{ marginLeft: "380px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Trạng thái:
                </Typography.Text>
                <Typography.Text className="ms-4">
                  <div
                    className="status-icon"
                    style={{ display: "inline", marginRight: "10px" }}
                  >
                    {dataSelect?.activeStatus === "Đang chờ" && (
                      <img src={dotBlue} alt="Dot Blue" />
                    )}
                    {dataSelect?.activeStatus === "Bỏ qua" && (
                      <img src={dotRed} alt="Dot Red" />
                    )}
                    {dataSelect?.activeStatus === "Đã sử dụng" && (
                      <img src={dotGray} alt="Dot Gray" />
                    )}
                  </div>
                  {dataSelect?.activeStatus}
                </Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Số thứ tự:
              </Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.stt}
              </Typography.Text>
              <div style={{ marginLeft: "385px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Số điện thoại:{" "}
                </Typography.Text>
                <Typography.Text className="ms-4">
                  {dataSelect?.phone}
                </Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Thời gian cấp:
              </Typography.Text>
              <Typography.Text className="ms-4">
                {dataSelect?.dateStart}
              </Typography.Text>
              <div style={{ marginLeft: "290px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Địa chỉ Email:{" "}
                </Typography.Text>
                <Typography.Text className="ms-4">
                  {dataSelect?.email}
                </Typography.Text>
              </div>
            </Space>
            <br />
            <div className="mt-3">
              <Typography.Text className="font-word">
                Hạn sử dụng:
              </Typography.Text>

              <Typography.Text className="ms-4">
                {dataSelect?.dateEnd}
              </Typography.Text>
            </div>
          </Card>
          <Button className="btn-orange" onClick={() => navigate(`/levels`)}>
            <Image src={iconBack} preview={false}></Image>
            <br />
            <Typography.Text className="text-orange">Quay lại</Typography.Text>
          </Button>
        </Space>
      </div>
    </div>
  );
}
export default DetailsLevel;
