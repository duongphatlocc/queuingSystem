import { Typography, Image, Input } from "antd";
import SlideMenu from "../../Component/menu";
import "../../css/info.css";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";

function Info() {
  return (
    <div>
      <SlideMenu />
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
        <Typography.Text className="info-information">
          Thông tin cá nhân
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "2500%" }}
        ></Image>
        <div style={{ display: "inline", marginLeft: "68%" }}>
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
      <div className="bg-infor">
        <div className="bg-left-infor">
          <Image
            src={avatar}
            preview={false}
            style={{ width: "250px" }}
          ></Image>
          <br />
          <div className="mt-3"></div>
          <Typography.Text className="infor-name ms-4">
            Lê Quỳnh Ái Vân
          </Typography.Text>

          <div className="bg-between-infor">
            <Typography.Text className="text-infor">
              Tên người dùng
            </Typography.Text>
            <br />

            <Input className="input-infor mt-2"></Input>
            <br />
            <br />
            <Typography.Text className="text-infor">
              Số điện thoại
            </Typography.Text>
            <br />

            <Input className="input-infor mt-2"></Input>
            <br />
            <br />
            <Typography.Text className="text-infor">Email:</Typography.Text>
            <br />

            <Input className="input-infor mt-2"></Input>
          </div>
          <div className="bg-right-infor">
            <Typography.Text className="text-infor">
              Tên đăng nhập
            </Typography.Text>
            <br />

            <Input className="input-infor mt-2"></Input>
            <br />
            <br />
            <Typography.Text className="text-infor">Mật khẩu</Typography.Text>
            <br />

            <Input className="input-infor mt-2"></Input>
            <br />
            <br />
            <Typography.Text className="text-infor">Vai trò:</Typography.Text>
            <br />

            <Input className="input-infor mt-2"></Input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Info;
