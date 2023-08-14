import { Typography, Image, Card, Space, Button, Checkbox } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import start from "../../image/start.svg";
import "../../css/device.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";
import TextArea from "antd/es/input/TextArea";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { updateService } from "../../Redux/test";
import { fetchService } from "../../Redux/servicelice";
import { ServiceData2 } from "./../../Redux/test";
import { db } from "../../Redux/firebase";

function UpdateService() {
  const { id } = useParams<{ id: string }>();

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const serviceData = useSelector(
    (state: RootState) => state.services.services
  );
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

  const [dataSelect, setDataSelect] = useState<ServiceData2 | null>(null);

  useEffect(() => {
    dispatch(fetchService());
    const selectedData = serviceData.find((item) => item.id === id);
    setDataSelect(selectedData || null); // Nếu không tìm thấy, setEmailData thành null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === "checkbox" ? checked : value;

    // Cập nhật trạng thái của trường dữ liệu
    setDataSelect((prevData: any) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDataSelect((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateService = async () => {
    if (dataSelect) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      const ipAddress = "190.1.1.2"; // Replace with the actual IP address logic

      // Create the diary entry object
      const diaryEntry = {
        username: userInfo?.fullName,
        timestamp: formattedDate,
        ipAddress: ipAddress,
        action: `Cập nhật thông tin  dịch vụ - ${dataSelect.name}`,
      };

      // Dispatch the update to Redux
      dispatch(updateService(dataSelect));

      // Save diary entry to Firebase
      const diaryRef = db.collection("diaris"); // Change the reference to where you want to store diaries
      await diaryRef.add(diaryEntry);

      navigate(`/services`); // Redirect after successful update
    }
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
          <Typography.Text className="text-title">Chi tiết</Typography.Text>
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
          <Typography.Text className="info-information">
            Cập nhật
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
                    placeholder="Mã dịch vụ"
                    value={dataSelect?.code}
                    onChange={handleInputChange}
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
                    value={dataSelect?.description}
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
                  placeholder="Tên dịch vụ"
                  value={dataSelect?.name}
                  onChange={handleInputChange}
                />
              </div>
              <Typography.Text className="info-information">
                Thông tin dịch vụ
              </Typography.Text>
              <br />
              <Space>
                <input type="checkbox" name="autoIncrease" />
                Tăng tự động từ:
                <input
                  style={{ width: 50 }}
                  className=" input-add"
                  type="number"
                  name="fromNumber"
                  placeholder="Từ số"
                  value={dataSelect?.fromNumber}
                  onChange={handleInputChange}
                />
                <Typography.Text>đến</Typography.Text>
                <input
                  style={{ width: 50 }}
                  className=" input-add"
                  type="number"
                  name="toNumber"
                  placeholder="Đến số"
                  value={dataSelect?.toNumber}
                  onChange={handleInputChange}
                />
              </Space>
              <br />

              <Space className="mt-1">
                <Checkbox>Prefix:</Checkbox>
                <input
                  style={{ width: 50, marginLeft: "65px" }}
                  className=" input-add"
                  value={dataSelect?.fromNumber}
                  onChange={handleInputChange}
                ></input>
              </Space>
              <br />
              <Space className="mt-1">
                <Checkbox>Surfix:</Checkbox>
                <input
                  style={{ width: 50, marginLeft: "65px" }}
                  className=" input-add"
                  value={dataSelect?.fromNumber}
                  onChange={handleInputChange}
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
              <Button className="btn-right-add" onClick={handleUpdateService}>
                Cập nhật
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateService;
