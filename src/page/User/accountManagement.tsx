import { Typography, Image, Select, Space, Table, Button } from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import iconBigger from "../../image/iconBigger.svg";
import "../../css/device.css";
import "../../css/user.css";

import { Link, useNavigate } from "react-router-dom";

import dotRed from "../../image/dotRed.svg";
import dotGreen from "../../image/dotGreen.svg";
import add from "../../image/add.svg";
import { ThunkDispatch } from "redux-thunk";
import store, { RootState } from "../../Redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, loginSuccess } from "../../Redux/userSlice";
import Search from "antd/es/input/Search";

function AccountManagement() {
  const [search, setSearch] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const navigate = useNavigate();

  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const userData = useSelector((state: RootState) => state.users.users);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const filteredUserData = userData.filter((item) => {
    const matchActiveStatus =
      activeStatusFilter === "Tất cả" || item.role === activeStatusFilter;
    const se =
      search.trim() === "" ||
      item.userName?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.activeStatus?.toLowerCase().includes(search.toLowerCase()) ||
      item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.toLowerCase().includes(search.toLowerCase()) ||
      item.role?.toLowerCase().includes(search.toLowerCase());
    return matchActiveStatus && se;
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
      render: (_text: any, record: any) => (
        <Link to={`/accountManagementUpdate/${record.id}`}>Cập nhật</Link>
      ),
    },
  ];
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
            <Search
              className="select"
              placeholder="input search text"
              value={search}
              onChange={handleSearch}
              style={{ width: 300 }}
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
        <Button
          className="btn-orange-user"
          onClick={() => navigate(`/accountManagementAdd`)}
        >
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
