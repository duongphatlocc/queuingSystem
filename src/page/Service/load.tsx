import {
  Typography,
  Image,
  Select,
  Space,
  Table,
  Button,
  DatePicker,
} from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import iconBigger from "../../image/iconBigger.svg";
import "../../css/device.css";

import { Link, useNavigate } from "react-router-dom";

import dotRed from "../../image/dotRed.svg";
import dotGreen from "../../image/dotGreen.svg";
import add from "../../image/add.svg";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../Redux/store";
import { useEffect } from "react";
import { loginSuccess } from "../../Redux/userSlice";
import downArrow from "../../image/downArrow.svg";
import Search from "antd/es/input/Search";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchService } from "../../Redux/servicelice";

function LoadDataService() {
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
  const navigate = useNavigate();
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const serviceData = useSelector(
    (state: RootState) => state.services.services
  );
  useEffect(() => {
    dispatch(fetchService());
  }, [dispatch]);
  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên dịch vụ ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activeStatus",
      key: "activeStatus",
      render: (activeStatus: string) => (
        <Space>
          {activeStatus === "Hoạt động" ? (
            <Image src={dotGreen} />
          ) : (
            <Image src={dotRed} />
          )}
          <span>{activeStatus}</span>
        </Space>
      ),
    },

    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: (_text: any, record: any) => (
        <Link to={`/detailsService/${record.id}`}>Chi tiết</Link>
      ),
    },
    {
      title: "",
      dataIndex: "update",
      key: "update",
      render: (_text: any, record: any) => (
        <Link to={`/updateService/${record.id}`}>Cập nhật</Link>
      ),
    },
  ];
  const dateFormat = "DD/MM/YYYY";

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

        <Typography.Text className="info-information">
          Danh sách thiết bị
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "2200%" }}
        ></Image>
        <Link to={"/information"}>
          {" "}
          <div style={{ display: "inline", marginLeft: "60%" }}>
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
          Danh sách thiết bị
        </Typography.Text>
        <br />
        <Space className="mt-3">
          <div>
            {" "}
            <Typography.Text className="label-input">
              Trạng thái hoạt động
            </Typography.Text>
            <br />
            <Select
              className="select"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 300 }}
              options={[
                {
                  value: "Tất cả",
                  label: "Tất cả",
                },
                {
                  value: "Hoạt động",
                  label: "Hoạt động",
                },
                {
                  value: "Ngưng hoạt động",
                  label: "Ngưng hoạt động",
                },
              ]}
            />
          </div>
          <div className="ms-5">
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
          <div style={{ marginLeft: "70%" }}>
            {" "}
            <Typography.Text className="label-input">Từ khoá</Typography.Text>
            <br />
            <Search
              className="select"
              placeholder="input search text"
              style={{ width: 250 }}
            />
          </div>
        </Space>

        <div className="mt-4"></div>
        <Space></Space>
        <Table
          columns={columns}
          bordered
          style={{ width: "74%" }}
          rowClassName={getRowClassName}
          pagination={{ pageSize: 4 }}
          dataSource={serviceData}
        />
        <Button
          className="btn-orange-device"
          onClick={() => navigate(`/addServices`)}
        >
          <Image src={add} preview={false}></Image>
          <br />
          <Typography.Text className="text-orange">
            Thêm <br />
            dịch vụ
          </Typography.Text>
        </Button>
      </div>
    </div>
  );
}
export default LoadDataService;
