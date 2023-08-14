import { Typography, Image, Space, Table, Button } from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import iconBigger from "../../image/iconBigger.svg";
import "../../css/device.css";
import "../../css/user.css";

import { Link, useNavigate } from "react-router-dom";

import add from "../../image/add.svg";

import store, { RootState } from "../../Redux/store";

import { useSelector } from "react-redux";
import { SetStateAction, useEffect, useState } from "react";
import { loginSuccess } from "../../Redux/userSlice";
import Search from "antd/es/input/Search";
import { db } from "../../Redux/firebase";

function LoadRole() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roleData, setRoleData] = useState<
    { id: string; name: string; description: string }[]
  >([]);
  const [userData, setUserData] = useState<{ id: string; role: string }[]>([]);
  db.collection("roles")
    .get()
    .then((querySnapshot) => {
      const roles: SetStateAction<
        { id: string; name: string; description: string }[]
      > = [];
      querySnapshot.forEach((doc) => {
        roles.push({ id: doc.id, ...doc.data() } as {
          id: string;
          name: string;
          description: string;
        });
      });
      setRoleData(roles);
    });
  const processedData = roleData.map((role) => {
    const usersCount = userData.filter(
      (user) => user.role === role.name
    ).length;
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      usersCount: usersCount,
    };
  });

  db.collection("users")
    .get()
    .then((querySnapshot) => {
      const users: SetStateAction<{ id: string; role: string }[]> = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as {
          id: string;
          role: string;
        });
      });
      setUserData(users);
    });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số người dùng",
      dataIndex: "usersCount",
      key: "usersCount",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "",
      dataIndex: "update",
      key: "update",
      render: (_text: any, record: any) => (
        <Link to={`/updateRole/${record.id}`}>Cập nhật</Link>
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
          Quản lý vai trò
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
          Danh sách vai trò
        </Typography.Text>
        <br />
        <Space className="mt-3">
          <div style={{ marginLeft: "830px" }}>
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
          dataSource={processedData}
        />
        <Button
          className="btn-orange-user"
          onClick={() => navigate(`/addRole`)}
        >
          <Image src={add} preview={false}></Image>
          <br />
          <Typography.Text className="text-orange">
            Thêm <br /> vai trò
          </Typography.Text>
        </Button>
      </div>
    </div>
  );
}
export default LoadRole;
