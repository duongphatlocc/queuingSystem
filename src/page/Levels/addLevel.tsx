import { Typography, Image, Card, Space, Select, Button, Modal } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/device.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

import "../../css/level.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { createLevel } from "../../Redux/levelSlice"; // Import hàm createLevel từ slice
import { db } from "../../Redux/firebase";
import { LevelData } from "../../Redux/levelSlice"; // Import interface LevelData từ slice
import { format } from "date-fns"; // Make sure the import is correct

function AddLevel() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const userInfo = useSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    // Kiểm tra nếu có giá trị printCount trong Local Storage
    const storedPrintCount = localStorage.getItem("printCount");
    const initialPrintCount = storedPrintCount ? parseInt(storedPrintCount) : 1;

    // Khởi tạo biến printCount từ giá trị trong Local Storage
    setPrintCount(initialPrintCount);
  }, []); // Thêm mảng rỗng để useEffect chỉ chạy một lần sau khi component được mount

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [printCount, setPrintCount] = useState<number>(1); // Bắt đầu từ 1

  const servicesData = useSelector(
    (state: RootState) => state.services.services
  );
  const [selectedService, setSelectedService] = useState<string>("");

  const serviceOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...servicesData.map((service) => ({
      value: service.name,
      label: service.name,
    })),
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<LevelData | null>(null);
  const handlePrintNumber = async () => {
    try {
      // Lấy danh sách mã code từ dữ liệu services
      const dataRef = await db.collection("services").get();
      const codes: string[] = dataRef.docs.map((doc) => doc.data().code);

      // Tìm mã code mới dựa trên danh sách đã có
      const maxCode = Math.max(...codes.map((code) => parseInt(code, 10)));

      // Tăng biến đếm lên 1 và sử dụng nó cho mã đuôi
      const newPrintCount = printCount + 1;
      setPrintCount(newPrintCount);

      // Lưu giá trị printCount vào Local Storage
      localStorage.setItem("printCount", newPrintCount.toString());

      // Tạo mã stt cho cấp số mới
      const newStt = `${maxCode}${newPrintCount.toString().padStart(4, "0")}`;

      // Tạo tên cấp số từ thông tin người dùng và dịch vụ đã chọn
      const newName = `${userInfo?.fullName} `;
      const newEmail = `${userInfo?.email}`;
      const newPhone = `${userInfo?.phone}`;

      const currentDate = new Date();
      const formattedDate = format(currentDate, "HH:mm - dd/MM/yyyy");

      const formatd = format(currentDate, "17:00 - dd/MM/yyyy");
      // Đặt giờ và phút, giây bằng 0

      // Thực hiện tạo mới cấp số với mã, tên và thông tin mới
      const newLevel: LevelData = {
        stt: newStt,
        name: newName,
        nameService: selectedService,
        dateStart: formattedDate,
        dateEnd: formatd,
        activeStatus: "Đang chờ",
        powerSupply: "Hệ thống",
        email: newEmail,
        phone: newPhone,
      };
      await dispatch(createLevel(newLevel));
      setSelectedLevel(newLevel);

      // Hiển thị modal với thông tin cấp số mới
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error creating new level:", error);
    }
  };

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
          Cấp số{" "}
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
        <Typography.Text className="info-information">
          Cấp số mới
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1800%" }}
        ></Image>
        <Link to={"/information"}>
          {" "}
          <div style={{ display: "inline", marginLeft: "50%" }}>
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
          <Card style={{ width: "1250px", height: "70vh" }}>
            <Typography.Text className="text-level">CẤP SỐ MỚI</Typography.Text>
            <br />
            <div className="mt-3"></div>
            <Typography.Text className="content-level">
              Dịch vụ khách hàng lựa chọn
            </Typography.Text>
            <br />
            <Select
              className="select mt-3"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 350, marginLeft: "39%" }}
              options={serviceOptions}
              onChange={(value) => setSelectedService(value.value)}
            />

            <br />
            <div className="two-button-level">
              {" "}
              <Button className="button-cancel-level">Hủy bỏ</Button>
              <Button
                className="ms-4 button-add-level"
                onClick={handlePrintNumber}
              >
                In số
              </Button>{" "}
            </div>
          </Card>
        </Space>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null} // Loại bỏ footer (nút OK và Cancel)
        maskClosable={false} // Ngăn Modal đóng khi nhấn ra ngoài
      >
        <Typography.Text className="stt-level">
          Số thứ tự được cấp
        </Typography.Text>
        <br />
        <Typography.Text className="stt">{selectedLevel?.stt}</Typography.Text>
        <br />
        <Typography.Text className="text">
          DV: {selectedLevel?.nameService}
        </Typography.Text>{" "}
        <div className="text-black">(tại quầy số 1)</div>
        <div className="bg-o">
          <div style={{ marginLeft: "100px", marginTop: "20px" }}>
            {" "}
            <Typography.Text className="white">
              Thời gian cấp: {selectedLevel?.dateStart}
            </Typography.Text>
            <br />
            <Typography.Text className="white">
              Hạn sử dụng: {selectedLevel?.dateEnd}
            </Typography.Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AddLevel;
