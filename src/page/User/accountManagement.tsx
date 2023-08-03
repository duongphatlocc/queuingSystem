import { Typography, Image, Select, Space, Table, Button } from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import iconBigger from "../../image/iconBigger.svg";
import "../../css/device.css";
import "../../css/user.css";

import { Link } from "react-router-dom";

import dotRed from "../../image/dotRed.svg";
import dotGreen from "../../image/dotGreen.svg";
import add from "../../image/add.svg";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../Redux/userSlice";

function AccountManagement() {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const userData = useSelector((state: RootState) => state.users.users);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const filteredUserData = userData.filter((item: { role: string }) => {
    const matchActiveStatus =
      activeStatusFilter === "Tất cả" ||
      item.role === activeStatusFilter;
    return matchActiveStatus;
  });
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
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
          Cài đặt hệ thống{" "}
          <Image
            src={iconBigger}
            preview={false}
            style={{ marginTop: "-8px" }}
          ></Image>
        </Typography.Text>

        <Typography.Text className="info-information">
          Quản lý tài khoản
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "2000%" }}
        ></Image>
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
          Lê Quỳnh Ái Vân
        </Typography.Text>
      </div>
      <div className="device-content">
        <Typography.Text className="device-title ">
          Danh sách tài khoản
        </Typography.Text>
        <br />
        <Space className="mt-3">
          <div>
            {" "}
            <Typography.Text className="label-input">
              Tên vai trò
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
                  value: "Kế toán",
                  label: "Kế toán",
                },
                {
                  value: "Quản lý",
                  label: "Quản lý",
                },
                {
                  value: "Admin",
                  label: "Admin",
                },
              ]}
            />
          </div>

          <div style={{ marginLeft: "520px" }}>
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
          rowClassName={getRowClassName}
          pagination={{ pageSize: 4 }}
          dataSource={filteredUserData}
        />
        <Button className="btn-orange-user">
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
export default AccountManagement;
