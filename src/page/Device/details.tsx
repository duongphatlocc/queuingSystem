import { Typography, Image, Card, Space, Button } from "antd";
import SideMenu from "../../Component/menu";
import iconBigger from "../../image/iconBigger.svg";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/device.css";
import iconPen from "../../image/iconPen.svg";

function DetailsDevice() {
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

        <Typography.Text className="text-title">
          Danh sách thiết bị
        </Typography.Text>
        <Image
          src={iconBigger}
          preview={false}
          style={{ marginTop: "-8px" }}
        ></Image>
        <Typography.Text className="info-information">
          Chi tiết thiết bị
        </Typography.Text>
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "1550%" }}
        ></Image>
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
          Lê Quỳnh Ái Vân
        </Typography.Text>
      </div>
      <div className="device-content">
        <Typography.Text className="device-title ">
          Quản lý thiết bị
        </Typography.Text>
        <div className="mt-4"></div>
        <Space>
          <Card style={{ width: "80%", height: "70vh" }}>
            <Typography.Text className="info-information">
              Thông tin thiết bị
            </Typography.Text>
            <br />
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Mã thiết bị:
              </Typography.Text>
              <Typography.Text className="ms-4">KIO_01</Typography.Text>
              <div style={{ marginLeft: "400px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Loại thiết bị:
                </Typography.Text>
                <Typography.Text className="ms-4">Kiosk</Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Tên thiết bị:
              </Typography.Text>
              <Typography.Text className="ms-4">Kiosk</Typography.Text>
              <div style={{ marginLeft: "405px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Tên đăng nhập:
                </Typography.Text>
                <Typography.Text className="ms-4">Linhkyo011</Typography.Text>
              </div>
            </Space>
            <Space className="mt-3">
              <Typography.Text className="font-word">
                Địa chỉ IP:
              </Typography.Text>
              <Typography.Text className="ms-4">128.172.308</Typography.Text>
              <div style={{ marginLeft: "378px" }}>
                {" "}
                <Typography.Text className="font-word">
                  Mật khẩu:{" "}
                </Typography.Text>
                <Typography.Text className="ms-4">CMS</Typography.Text>
              </div>
            </Space>
            <br />
            <div className="mt-3">
              <Typography.Text className="font-word">
                Dịch vụ sử dụng:
              </Typography.Text>
              <br />
              <div className="mt-2"></div>
              <Typography.Text>
                Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai
                mũi họng, Khám hô hấp, Khám tổng quát.
              </Typography.Text>
            </div>
          </Card>
          <Button className="btn-orange">
            <Image src={iconPen} preview={false}></Image>
            <br />
            <Typography.Text className="text-orange">
              Cập nhật <br /> thiết bị
            </Typography.Text>
          </Button>
        </Space>
      </div>
    </div>
  );
}
export default DetailsDevice;
