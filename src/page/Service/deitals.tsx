import {
  Typography,
  Image,
  Card,
  Space,
  Input,
  DatePicker,
  Select,
  Table,
  Button,
} from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/device.css";
import "../../css/service.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import downArrow from "../../image/downArrow.svg";

import { loginSuccess } from "../../Redux/userSlice";
import Search from "antd/es/input/Search";
import dotGreen from "../../image/dotGreen.svg";
import dotGray from "../../image/dotGray.svg";
import dotBlue from "../../image/dotBlue.svg";
import { db } from "../../Redux/firebase";
import iconBack from "../../image/iconBack.svg";
import iconPen from "../../image/iconPen.svg";

function ServiceDetails() {
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
  const getRandomActiveStatus = () => {
    const statuses = ["Vắng", "Đang thực hiện", "Đã hoàn thành"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };
  const dateFormat = "DD/MM/YYYY";
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activeStatus",
      key: "activeStatus",
      render: (activeStatus: string) => (
        <Space>
          {activeStatus.toLowerCase() === "vắng" ? (
            <Image src={dotGray} />
          ) : activeStatus.toLowerCase() === "đang thực hiện" ? (
            <Image src={dotBlue} />
          ) : (
            <Image src={dotGreen} />
          )}
          <span>{activeStatus}</span>
        </Space>
      ),
    },
  ];
  const { id } = useParams<{ id: string }>();
  const [serviceData, setServiceData] = useState<any>(null);
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    // Lấy thông tin dịch vụ từ Firebase dựa vào ID được truyền từ trang LoadDataService

    db.collection("services")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setServiceData(doc.data());
          // Lấy danh sách codes từ serviceData nếu tồn tại
          const codesArray = doc.data()?.codes || [];
          setCodes(codesArray);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  if (!serviceData) {
    return <div>Loading...</div>;
  }
  const tableData = codes.map((code) => ({
    key: code,
    code: code, // Assuming 'code' is a property of the 'codes' array objects
    activeStatus: getRandomActiveStatus(), // Assuming 'activeStatus' is a property of the 'codes' array objects
  }));

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
        <Typography.Text className="info-information">Chi tiết</Typography.Text>
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
        <br />
        <Space>
          <Card style={{ width: "55vh", height: "80vh" }}>
            <div>
              <Typography.Text className="info-information">
                Thông tin dịch vụ
              </Typography.Text>
              <br />
              <br />
              <Typography.Text className="font-word">
                Mã dịch vụ:
              </Typography.Text>
              <Typography.Text className="ms-2">
                {serviceData.code}
              </Typography.Text>
            </div>
            <div className="mt-3">
              <Typography.Text className="font-word">
                Tên dịch vụ:
              </Typography.Text>
              <Typography.Text className="ms-2">
                {serviceData.name}
              </Typography.Text>
            </div>
            <div className="mt-3">
              <Typography.Text className="font-word">Mô tả:</Typography.Text>
              <Typography.Text className="ms-5">
                {serviceData.description}
              </Typography.Text>
            </div>
            <br />
            <Typography.Text className="info-information">
              Quy tắc cấp số
            </Typography.Text>
            <br />
            <div className="mt-2"></div>
            <div>
              <Typography.Text className="font-word">
                Tăng tự động:{" "}
              </Typography.Text>

              <Input
                className="input-add"
                style={{ width: 50 }}
                value={serviceData.fromNumber}
              ></Input>
              <Typography.Text className="ms-3">đến</Typography.Text>
              <Input
                className="ms-3 input-add"
                style={{ width: 50 }}
                value={serviceData.toNumber}
              ></Input>
            </div>
            <div className="mt-2">
              <Typography.Text className="font-word">Prefix: </Typography.Text>

              <Input
                className="ms-5 input-add"
                style={{ width: 50 }}
                value={serviceData.fromNumber}
              ></Input>
            </div>
            <Typography.Text className="font-word">
              Reset mỗi ngày{" "}
            </Typography.Text>
            <br />
            <Typography.Text>
              Ví dụ : {serviceData.code} -{serviceData.codes[0]}
            </Typography.Text>
          </Card>
          <Card style={{ width: "100vh", height: "80vh" }}>
            <Space>
              <div>
                {" "}
                <Typography.Text className="label-input">
                  Trạng thái
                </Typography.Text>
                <br />
                <Select
                  className="select"
                  labelInValue
                  defaultValue={{ value: "Tất cả", label: "Tất cả" }}
                  style={{ width: 150 }}
                  options={[
                    {
                      value: "Tất cả",
                      label: "Tất cả",
                    },
                    {
                      value: "Đã hoàn thành",
                      label: "Đã hoàn thành",
                    },
                    {
                      value: "Đã thực hiện",
                      label: "Đã thực hiện",
                    },
                    {
                      value: "Vắng",
                      label: "Vắng",
                    },
                  ]}
                />
              </div>
              <div className="ms-2">
                {" "}
                <Typography.Text className="label-input">
                  Chọn thời gian
                </Typography.Text>
                <br />
                <DatePicker
                  format={dateFormat}
                  className="select"
                  style={{ width: 150, height: "40px" }}
                ></DatePicker>
              </div>
              <div style={{ marginLeft: "", marginTop: "15px" }}>
                <Image src={downArrow}></Image>
              </div>
              <div>
                {" "}
                <br />
                <DatePicker
                  format={dateFormat}
                  className="select"
                  style={{ width: 150, height: "40px" }}
                ></DatePicker>
              </div>
              <div className="ms-2">
                {" "}
                <Typography.Text className="label-input">
                  Từ khoá
                </Typography.Text>
                <br />
                <Search
                  className="select"
                  placeholder="input search text"
                  style={{ width: 180 }}
                />
              </div>
            </Space>
            <div className="mt-3"></div>
            <Table
              columns={columns}
              dataSource={tableData} // Pass the dataSource here
              bordered
              style={{ width: "100%" }}
              pagination={{ pageSize: 4 }}
            />
          </Card>
          <Button
            className="btn-orange-service"
            onClick={() => navigate(`/updateService/`)}
          >
            <Image src={iconPen} preview={false}></Image>
            <br />
            <Typography.Text className="text-orange">
              Cập nhật
              <br />
              danh sách
            </Typography.Text>
          </Button>
          <div className="mt-5"></div>
          <Button
            className="btn-orange-service1"
            onClick={() => navigate(`/services`)}
          >
            <Image src={iconBack} preview={false}></Image>
            <br />
            <Typography.Text className="text-orange">Quay lại</Typography.Text>
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default ServiceDetails;
