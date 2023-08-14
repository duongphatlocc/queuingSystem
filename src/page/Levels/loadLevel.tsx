import { Typography, Image, Space, Select, Table, Button } from "antd";
import SideMenu from "../../Component/menu";
import { Link, useNavigate } from "react-router-dom";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../..//image/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import store, { RootState } from "../../Redux/store";
import { loginSuccess } from "../../Redux/userSlice";
import Search from "antd/es/input/Search";
import { DatePicker } from "antd";
import "../../css/level.css";

import dotGray from "../../image/dotGray.svg";
import dotBlue from "../../image/dotBlue.svg";
import dotRed from "../../image/dotRed.svg";
import downArrow from "../../image/downArrow.svg";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchLevel } from "../../Redux/levelSlice";
import add from "../../image/add.svg";
import dayjs from "dayjs";
function LoadLeveL() {
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
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
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const levelData = useSelector((state: RootState) => state.levels.levels);
  useEffect(() => {
    dispatch(fetchLevel());
  }, [dispatch]);
  const dateFormat = "DD/MM/YYYY";

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên dịch vụ ",
      dataIndex: "nameService",
      key: "nameService",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "dateStart",
      key: "dateStart",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "dateEnd",
      key: "dateEnd",
    },
    {
      title: "Trạng thái",
      dataIndex: "activeStatus",
      key: "activeStatus",
      render: (activeStatus: string) => (
        <Space>
          {activeStatus === "Đang chờ" ? (
            <Image src={dotBlue} preview={false} />
          ) : activeStatus === "Đã sử dụng" ? (
            <Image src={dotGray} preview={false} />
          ) : (
            <Image src={dotRed} preview={false}></Image>
          )}
          <span>{activeStatus}</span>
        </Space>
      ),
    },
    {
      title: "Nguồn cấp",
      dataIndex: "powerSupply",
      key: "powerSupply",
    },

    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: (_text: any, record: any) => (
        <Link to={`/detailsLevel/${record.id}`}>Chi tiết</Link>
      ),
    },
  ];
  const servicesData = useSelector(
    (state: RootState) => state.services.services
  );
  const serviceOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...servicesData.map((service) => ({
      value: service.name,
      label: service.name,
    })),
  ];
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const handleStartDateChange = (date: any, dateString: any) => {
    setDateStart(date);
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setDateEnd(date);
  };

  //
  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");
  const [serviceStatusFilter, setServiceStatusFilter] = useState("Tất cả");
  const [powerSupplyFilter, setPowerSupplyFilter] = useState("Tất cả");
  const filteredUserData = levelData.filter((item) => {
    const matchActiveStatus =
      activeStatusFilter === "Tất cả" ||
      item.activeStatus === activeStatusFilter;
    const matchService =
      serviceStatusFilter === "Tất cả" ||
      item.nameService === serviceStatusFilter;
    const matchPowerSupply =
      powerSupplyFilter === "Tất cả" || item.powerSupply === powerSupplyFilter;

    const matchStartDate =
      !dateStart ||
      (item.dateStart && dayjs(item.dateStart).isSame(dateStart)) ||
      dayjs(item.dateStart).isAfter(dateStart);

    const matchEndDate =
      !dateEnd ||
      (item.dateEnd && dayjs(item.dateEnd).isSame(dateEnd)) ||
      dayjs(item.dateEnd).isBefore(dateEnd);

    return (
      matchActiveStatus &&
      matchService &&
      matchPowerSupply &&
      matchStartDate &&
      matchEndDate
    );
  });
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
          Cấp số{" "}
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
        </Typography.Text>

        <Typography.Text className="info-information">
          Danh sách cấp số
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
        <Typography.Text className="device-title ">
          Quản lý cấp số
        </Typography.Text>
        <br />
        <Space className="mt-3">
          <div>
            {" "}
            <Typography.Text className="label-input">
              Tên dịch vụ
            </Typography.Text>
            <br />
            <Select
              className="select"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 150 }}
              onChange={(value) => {
                setServiceStatusFilter(value.value);
              }}
              options={serviceOptions}
            />
          </div>
          <div>
            {" "}
            <Typography.Text className="label-input">
              Tình trạng
            </Typography.Text>
            <br />
            <Select
              className="select"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 150 }}
              onChange={(value) => {
                setActiveStatusFilter(value.value);
              }}
              options={[
                {
                  value: "Tất cả",
                  label: "Tất cả",
                },
                {
                  value: "Đang chờ",
                  label: "Đang chờ",
                },
                {
                  value: "Đã sử dụng",
                  label: "Đã sử dụng",
                },
                {
                  value: "Bỏ qua",
                  label: "Bỏ qua",
                },
              ]}
            />
          </div>
          <div>
            {" "}
            <Typography.Text className="label-input">Nguồn cấp</Typography.Text>
            <br />
            <Select
              className="select"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 150 }}
              onChange={(value) => {
                setPowerSupplyFilter(value.value);
              }}
              options={[
                {
                  value: "Tất cả",
                  label: "Tất cả",
                },
                {
                  value: "Kiosk",
                  label: "Kiosk",
                },
                {
                  value: "Hệ thống",
                  label: "Hệ thống",
                },
              ]}
            />
          </div>{" "}
          <div>
            {" "}
            <Typography.Text className="label-input">
              Chọn thời gian
            </Typography.Text>
            <br />
            <DatePicker
              format={dateFormat}
              className="select"
              style={{ width: 150, height: "40px" }}
              value={dateStart}
              onChange={handleStartDateChange}
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
              style={{ width: 250, height: "40px" }}
              value={dateEnd}
              onChange={handleEndDateChange}
            />
          </div>
          <div style={{ marginLeft: "10%" }}>
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
          dataSource={filteredUserData}
          rowClassName={getRowClassName}
        />
        <Button
          className="btn-orange-device"
          onClick={() => navigate(`/addLevel`)}
        >
          <Image src={add} preview={false}></Image>
          <br />
          <Typography.Text className="text-orange">
            Cấp <br />
            số mới
          </Typography.Text>
        </Button>
      </div>
    </div>
  );
}
export default LoadLeveL;
