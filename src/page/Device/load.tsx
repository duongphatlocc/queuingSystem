import { Typography, Image, Select, Space, Table, Button } from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import iconBigger from "../../image/iconBigger.svg";
import "../../css/device.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchDevice } from "../../Redux/deviceSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dotRed from "../../image/dotRed.svg";
import dotGreen from "../../image/dotGreen.svg";
import add from "../../image/add.svg";

function LoadDataDevice() {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };
  const dispatch: any = useDispatch();

  const deviceData = useSelector((state: any) => state.device.device);
  useEffect(() => {
    dispatch(fetchDevice());
  });
  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");
  const [connectionStatusFilter, setConnectionStatusFilter] =
    useState("Tất cả");
  const filteredDeviceData = deviceData.filter(
    (item: { activeStatus: string; connectionStatus: string }) => {
      const matchActiveStatus =
        activeStatusFilter === "Tất cả" ||
        item.activeStatus === activeStatusFilter;
      const matchConnectionStatus =
        connectionStatusFilter === "Tất cả" ||
        item.connectionStatus === connectionStatusFilter;

      return matchActiveStatus && matchConnectionStatus;
    }
  );
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "idDevice",
      key: "idDevice",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "address",
      key: "address",
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
      title: "Trạng thái kết nối",
      dataIndex: "connectionStatus",
      key: "connectionStatus",
      render: (connectionStatus: string) => (
        <Space>
          {connectionStatus === "Kết nối" ? (
            <Image src={dotGreen} />
          ) : (
            <Image src={dotRed} />
          )}
          <span>{connectionStatus}</span>
        </Space>
      ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "serviceUse",
      key: "serviceUse",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: () => <Link to={"/details"}>Chi tiết</Link>,
    },
    {
      title: "",
      dataIndex: "update",
      key: "update",
      render: () => <Link to={""}>Cập nhật</Link>,
    },
  ];

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
          Lê Quỳnh Ái Vân
        </Typography.Text>
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
              onChange={(value) => {
                setActiveStatusFilter(value.value);
              }}
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
          <div className="ms-4">
            {" "}
            <Typography.Text className="label-input">
              Trạng thái kết nối
            </Typography.Text>
            <br />
            <Select
              className="select"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 300 }}
              onChange={(value) => {
                setConnectionStatusFilter(value.value);
              }}
              options={[
                {
                  value: "Tất cả",
                  label: "Tất cả",
                },
                {
                  value: "Kết nối",
                  label: "Kết nối",
                },
                {
                  value: "Mất kết nối",
                  label: "Mất kết nối",
                },
              ]}
            />
          </div>
          <div style={{ marginLeft: "200px" }}>
            {" "}
            <Typography.Text className="label-input">Từ khoá</Typography.Text>
            <br />
            <Select
              className="select"
              labelInValue
              defaultValue={{ value: "Tất cả", label: "Tất cả" }}
              style={{ width: 300 }}
              onChange={handleChange}
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
        </Space>

        <div className="mt-4"></div>
        <Space></Space>
        <Table
          columns={columns}
          bordered
          style={{ width: "74%" }}
          dataSource={filteredDeviceData}
        />
        <Button className="btn-orange-device">
          <Image src={add} preview={false}></Image>
          <br />
          <Typography.Text className="text-orange">
            Thêm <br />
            thiết bị
          </Typography.Text>
        </Button>
      </div>
    </div>
  );
}
export default LoadDataDevice;
