import { Typography, Image, Card, Space, Input, Button, Select } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import start from "../../image/start.svg";
import "../../css/user.css";
import "../../css/device.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserData, addUser, loginSuccess } from "../../Redux/userSlice";
import store, { RootState } from "../../Redux/store";
import TextArea from "antd/es/input/TextArea";
import "../../css/user.css";
import Checkbox from "antd/es/checkbox/Checkbox";
import { RoleData, addRole } from "../../Redux/roleSlice";

function AddRole() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch: any = useDispatch();
  const handleCreateRole = () => {
    const roleData: RoleData = {
      name,
      description,
    };
    dispatch(addRole(roleData)).then((action: any) => {
      console.log(roleData);
    });
    navigate(`/roleManagement`);
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

        <Typography.Text className="text-title">
          Quản lý vai trò
        </Typography.Text>
        <Image
          src={iconBigger}
          preview={false}
          style={{ marginTop: "-8px" }}
        ></Image>
        <Typography.Text className="info-information">
          Thêm vai trò
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1550%" }}
        ></Image>
        <Link to={"/information"}>
          {" "}
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
          Danh sách vai trò
        </Typography.Text>

        <div className="mt-4">
          <Card style={{ width: "75%", height: "62vh" }}>
            <Typography.Text className="info-information">
              Thông tin vai trò
            </Typography.Text>

            <Space>
              <div style={{ marginTop: "-50px" }}>
                <Typography.Text className="font-word ">
                  Tên vai trò: <Image src={start} preview={false}></Image>
                </Typography.Text>
                <br />
                <Input
                  className="mt-2 input-add"
                  placeholder="Nhập tên vai trò"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <br />
                <div className="mt-2">
                  <Typography.Text className="font-word ">
                    Mô tả:
                  </Typography.Text>
                  <br />
                  <TextArea
                    rows={7}
                    className="mt-2 input-add"
                    placeholder="Nhập mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextArea>
                </div>
                <div className="mt-3"></div>
                <Typography.Text>
                  <Image src={start} preview={false} className=""></Image> Là
                  trường thông tin bắt buộc
                </Typography.Text>
              </div>
              <div>
                <Typography.Text className="font-word ms-4 ">
                  Phân quyền chức năng{" "}
                  <Image src={start} preview={false}></Image>
                </Typography.Text>
                <div className="bg-right-orange">
                  <div style={{ marginLeft: "30px" }}>
                    <br />
                    <Typography.Text className="info-information">
                      Nhóm chức năng A
                    </Typography.Text>
                    <br />
                    <div className="mt-2"></div>
                    <Checkbox>Tất cả</Checkbox>
                    <div className="mt-2"></div>
                    <Checkbox>Chức năng x</Checkbox>
                    <div className="mt-2"></div>
                    <Checkbox>Chức năng y</Checkbox>
                    <div className="mt-2"></div>
                    <Checkbox>Chức năng z</Checkbox>
                  </div>
                  <div style={{ marginLeft: "30px" }}>
                    <br />
                    <Typography.Text className="info-information">
                      Nhóm chức năng B
                    </Typography.Text>
                    <br />
                    <div className="mt-2"></div>
                    <Checkbox>Tất cả</Checkbox>
                    <div className="mt-2"></div>
                    <Checkbox>Chức năng x</Checkbox>
                    <div className="mt-2"></div>
                    <Checkbox>Chức năng y</Checkbox>
                    <div className="mt-2"></div>
                    <Checkbox>Chức năng z</Checkbox>
                  </div>
                </div>
              </div>
            </Space>
          </Card>
          <Space className="two-button">
            <Button
              className="btn-cancel"
              onClick={() => navigate(`/roleManagement`)}
            >
              Hủy bỏ
            </Button>
            <Button className="btn-right-add" onClick={handleCreateRole}>
              Thêm
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
export default AddRole;
