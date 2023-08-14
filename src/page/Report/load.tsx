import { Typography, Image, Space, Select, Table, Button } from "antd";
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

import dotGray from "../../image/dotGray.svg";
import dotBlue from "../../image/dotBlue.svg";
import dotRed from "../../image/dotRed.svg";
import downArrow from "../../image/downArrow.svg";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchLevel } from "../../Redux/levelSlice";
import download from "../../image/download.svg";
import iconC from "../../image/iconC.svg";
import { utils, writeFile } from "xlsx";



function LoadReport() {
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
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
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const levelData = useSelector((state: RootState) => state.levels.levels);
  useEffect(() => {
    dispatch(fetchLevel());
  }, [dispatch]);
  const dateFormat = "DD/MM/YYYY";

  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const sttOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...levelData.map((level) => ({
      value: level.stt,
      label: level.stt,
    })),
  ];
  const nameServiceOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...levelData.map((level) => ({
      value: level.nameService,
      label: level.nameService,
    })),
  ];
  const dateStartOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...levelData.map((level) => ({
      value: level.dateStart,
      label: level.dateStart,
    })),
  ];
  const activeStatusOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...levelData.map((level) => ({
      value: level.activeStatus,
      label: level.activeStatus,
    })),
  ];
  const powerSupplyOptions = [
    { value: "Tất cả", label: "Tất cả" },
    ...levelData.map((level) => ({
      value: level.powerSupply,
      label: level.powerSupply,
    })),
  ];
  const columns = [
    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Số thứ tự
          </Typography.Text>
          <Image
            preview={false}
            src={iconC}
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => setSelectedColumn("stt")}
          />
          {selectedColumn === "stt" && (
            <Select
              style={{
                position: "absolute",
                marginLeft: "50%",
                marginTop: "-15px",
                opacity: "-1",
                width: 150,
                height: 10,
              }}
              className="your-custom-select-class"
              options={sttOptions}
              labelInValue
              onChange={(value) => {
                setSttFilter(value.value);
              }}
            ></Select>
          )}
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
    },

    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Tên dịch vụ
          </Typography.Text>
          <Image
            preview={false}
            src={iconC}
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => setSelectedColumn("stt")}
          />
          {selectedColumn === "stt" && (
            <Select
              style={{
                position: "absolute",
                marginLeft: "50%",
                marginTop: "-15px",
                opacity: "-1",
                width: 150,
                height: 10,
              }}
              options={nameServiceOptions}
              className="your-custom-select-class"
              labelInValue
              onChange={(value) => {
                setNameServiceFilter(value.value);
              }}
            ></Select>
          )}
        </div>
      ),
      dataIndex: "nameService",
      key: "nameService",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Thời gian cấp
          </Typography.Text>
          <Image
            preview={false}
            src={iconC}
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => setSelectedColumn("stt")}
          />
          {selectedColumn === "stt" && (
            <Select
              style={{
                position: "absolute",
                marginLeft: "50%",
                marginTop: "-15px",
                opacity: "-1",
                width: 150,
                height: 10,
              }}
              className="your-custom-select-class"
              options={dateStartOptions}
              labelInValue
              onChange={(value) => {
                setDateStartFilter(value.value);
              }}
            ></Select>
          )}
        </div>
      ),
      dataIndex: "dateStart",
      key: "dateStart",
    },

    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Tình trạng
          </Typography.Text>
          <Image
            preview={false}
            src={iconC}
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => setSelectedColumn("stt")}
          />
          {selectedColumn === "stt" && (
            <Select
              style={{
                position: "absolute",
                marginLeft: "50%",
                marginTop: "-15px",
                opacity: "-1",
                width: 150,
                height: 10,
              }}
              className="your-custom-select-class"
              options={activeStatusOptions}
              labelInValue
              onChange={(value) => {
                setActiveStatusFilter(value.value);
              }}
            ></Select>
          )}
        </div>
      ),
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
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ marginRight: "50%" }}>
            Nguồn cấp
          </Typography.Text>
          <Image
            preview={false}
            src={iconC}
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => setSelectedColumn("stt")}
          />
          {selectedColumn === "stt" && (
            <Select
              style={{
                position: "absolute",
                marginLeft: "50%",
                marginTop: "-15px",
                opacity: "-1",
                width: 150,
                height: 10,
              }}
              className="your-custom-select-class"
              options={powerSupplyOptions}
              labelInValue
              onChange={(value) => {
                setPowerSupplyFilter(value.value);
              }}
            ></Select>
          )}
        </div>
      ),
      dataIndex: "powerSupply",
      key: "powerSupply",
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

  //
  const [sttFilter, setSttFilter] = useState("Tất cả");
  const [nameServiceFilter, setNameServiceFilter] = useState("Tất cả");
  const [dateStartFilter, setDateStartFilter] = useState("Tất cả");
  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");
  const [powerSupplyFilter, setPowerSupplyFilter] = useState("Tất cả");

  const filteredUserData = levelData.filter((item) => {
    const matchStt = sttFilter === "Tất cả" || item.stt === sttFilter;
    const matchNameServiceFilter =
      nameServiceFilter === "Tất cả" || item.nameService === nameServiceFilter;
    const matchDate =
      dateStartFilter === "Tất cả" || item.dateStart === dateStartFilter;
    const matchActiveStatus =
      activeStatusFilter === "Tất cả" ||
      item.activeStatus === activeStatusFilter;
    const matchPowerSupply =
      powerSupplyFilter === "Tất cả" || item.powerSupply === powerSupplyFilter;

    return (
      matchStt &&
      matchActiveStatus &&
      matchDate &&
      matchNameServiceFilter &&
      matchPowerSupply
    );
  });
  const handleExportExcel = () => {
    const dataToExport = filteredUserData.map(item => ({
      "Số thứ tự": item.stt,
      "Tên dịch vụ": item.nameService,
      "Thời gian cấp": item.dateStart,
      "Tình trạng": item.activeStatus,
      "Nguồn cấp": item.powerSupply,
    }));
  
    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
  
    writeFile(wb, "data.xlsx", { bookType: "xlsx", type: "buffer" });
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
          Báo cáo{" "}
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
        </Typography.Text>

        <Typography.Text className="info-information">
          Lập báo cáo
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
          <div style={{ marginTop: "22px" }}>
            {" "}
            <DatePicker
              format={dateFormat}
              className="select"
              style={{ width: 150, height: "40px" }}
              value={dateEnd}
              onChange={handleEndDateChange}
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
        <Button className="btn-orange-device" onClick={handleExportExcel}>
          <Image src={download} preview={false}></Image>
          <br />
          <Typography.Text className="text-orange">Tải về</Typography.Text>
        </Button>
      </div>
    </div>
  );
}
export default LoadReport;
