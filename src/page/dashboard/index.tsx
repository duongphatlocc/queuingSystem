import { Typography, Image, Card, Space } from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/dashboard.css";
import stt from "../../image/stt.svg";
import stt2 from "../../image/stt2.svg";
import stt3 from "../../image/stt3.svg";
import stt4 from "../../image/stt4.svg";
import { RingProgress } from "@ant-design/charts"; // Import the Bar component

function Dashboard() {
  const config = {
    height: 65,
    width: 65,
    autoFit: false,
    percent: 0.07,
    color: ["#5B8FF9", "#E8EDF3"],
  };
  const config2 = {
    height: 65,
    width: 65,
    autoFit: false,

    color: ["#5B8FF9", "#E8EDF3"],
  };
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
        <Typography.Text className="info-information">
          Dashboard
        </Typography.Text>
        <br />

        <Typography.Text className="dashboard-title ">
          Biểu đồ cấp số
        </Typography.Text>
        <br />
        <br />
        <br />
        <br />
        <Space>
          <Card>
            <Space>
              <Image src={stt} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br /> đã cấp
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">4678</Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
          <Card>
            <Space>
              <Image src={stt2} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br />
                đã sử dụng
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">4678</Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
          <Card>
            <Space>
              <Image src={stt3} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br />
                đang chờ
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">4678</Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
          <Card>
            <Space>
              <Image src={stt4} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br />
                đã bỏ qua
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">4678</Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
        </Space>
      </div>
      <div className="bg-right-white">
        <br />
        <Image
          src={notification}
          preview={false}
          style={{ marginLeft: "395%" }}
        ></Image>

        <div style={{ display: "inline", marginLeft: "35%" }}>
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

        <br />
        <br />
        <Typography.Text className="text-right-dashboard">
          Tổng quan
        </Typography.Text>
        <div style={{ position: "relative" }}>
          <Card className="card-right ">
            <RingProgress {...config} />
            <RingProgress percent={0} {...config2} />
          </Card>
        </div>

        <Card className="card-right mt-2">
          <RingProgress {...config} />
        </Card>

        <Card className="card-right mt-2">
          <RingProgress {...config} />
        </Card>
      </div>
    </div>
  );
}
export default Dashboard;
