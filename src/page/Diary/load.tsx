import { Typography, Image, Space, Table } from "antd";
import SideMenu from "../../Component/menu";
import { Link } from "react-router-dom";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../..//image/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";
import { DatePicker } from "antd";
import "../../css/level.css";
import downArrow from "../../image/downArrow.svg";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchDiary } from "../../Redux/diarySlice";
import Search from "antd/es/input/Search";

function LoadDiary() {
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

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
  const diaryData = useSelector((state: RootState) => state.diaries.diaris);
  useEffect(() => {
    dispatch(fetchDiary());
  }, [dispatch]);

  const columns = [
    {
      title: (
        <div>
          <Typography.Text style={{ marginRight: "50%" }}>
            Tên đăng nhập
          </Typography.Text>
        </div>
      ),
      dataIndex: "username",
      key: "username",
    },

    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Thời gian tác động
          </Typography.Text>
        </div>
      ),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: any) => {
        const formattedTimestamp = new Date(timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        });
        return <span>{formattedTimestamp}</span>;
      },
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            IP thực hiện
          </Typography.Text>
        </div>
      ),
      dataIndex: "ipAddress",
      key: "ipAddress",
    },

    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Thao tác thực hiện
          </Typography.Text>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const handleStartDateChange = (date: any, dateString: any) => {
    setDateStart(date);
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setDateEnd(date);
  };

  return (
    <div>
      {" "}
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
          ></Image>
        </Typography.Text>

        <Typography.Text className="info-information">
          Nhật ký hoạt động
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "2000%" }}
        ></Image>
        <Link to={"/information"}>
          <div style={{ display: "inline", marginLeft: "55%" }}>
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
        <br />
        <Space>
          <div>
            {" "}
            <Typography.Text className="label-input">
              Chọn thời gian
            </Typography.Text>
            <br />
            <DatePicker
              className="select"
              style={{ width: 150, height: "40px" }}
              value={dateStart}
              onChange={handleStartDateChange}
            ></DatePicker>
          </div>
          <div style={{ marginLeft: "", marginTop: "15px" }}>
            <Image src={downArrow}></Image>
          </div>
          <div style={{ marginTop: "22px" }}>
            {" "}
            <DatePicker
              className="select"
              style={{ width: 150, height: "40px" }}
              value={dateEnd}
              onChange={handleEndDateChange}
            />
          </div>
          <div style={{ marginLeft: "550px" }}>
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
          pagination={{ pageSize: 4 }}
          rowClassName={getRowClassName}
          dataSource={diaryData}
        />
      </div>
    </div>
  );
}
export default LoadDiary;
