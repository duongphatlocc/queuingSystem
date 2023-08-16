import { Typography, Image, Card, Space, Select } from "antd";
import SideMenu from "../../Component/menu";
import notification from "../../image/notification.svg";
import avatar from "../../image/avatar.svg";
import "../../css/dashboard.css";
import stt from "../../image/stt.svg";
import stt2 from "../../image/stt2.svg";
import stt3 from "../../image/stt3.svg";
import stt4 from "../../image/stt4.svg";
import { Area, RingProgress } from "@ant-design/charts"; // Import the Bar component
import { db } from "../../Redux/firebase";
import { useEffect, useState } from "react";
import imageDevice from "../../image/imageDevice.svg";
import imageDate from "../../image/imageDate.svg";
import imageLevel from "../../image/imageLevel.svg";
import imageService from "../../image/imageService.svg";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config3 = {
    data,
    xField: "timePeriod",
    yField: "value",
    width: 20,
    height: 320,
    xAxis: {
      range: [0, 1],
    },
  };
  const [totalSttCount, setTotalSttCount] = useState(0);
  const [usedSttCount, setUsedSttCount] = useState(0);
  const [choSttCount, setChoSttCount] = useState(0);
  const [boSttCount, setBoSttCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const levelsRef = db.collection("levels");
      const querySnapshot = await levelsRef.get();
      const numberOfItems = querySnapshot.size;
      setTotalSttCount(numberOfItems);

      // Truy vấn dữ liệu có activeStatus là "đã sử dụng"
      const usedSttQuerySnapshot = await levelsRef
        .where("activeStatus", "==", "Đã sử dụng")
        .get();
      const usedSttCount = usedSttQuerySnapshot.size;
      setUsedSttCount(usedSttCount);

      const choSttQuerySnapshot = await levelsRef
        .where("activeStatus", "==", "Đang chờ")
        .get();
      const choSttCount = choSttQuerySnapshot.size;
      setChoSttCount(choSttCount);

      const boSttQuerySnapshot = await levelsRef
        .where("activeStatus", "==", "Bỏ qua")
        .get();
      const boSttCount = boSttQuerySnapshot.size;
      setBoSttCount(boSttCount);
    };

    fetchData();
  }, []);

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
          <Card style={{ width: "190px" }}>
            <Space>
              <Image src={stt} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br /> đã cấp
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">
                {totalSttCount}
              </Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
          <Card style={{ width: "190px" }}>
            <Space>
              <Image src={stt2} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br />
                đã sử dụng
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">
                {usedSttCount}
              </Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
          <Card style={{ width: "200px" }}>
            <Space>
              <Image src={stt3} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br />
                đang chờ
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">
                {choSttCount}
              </Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
          <Card style={{ width: "200px" }}>
            <Space>
              <Image src={stt4} preview={false}></Image>
              <Typography.Text className="dashboard-text">
                Số thứ tự <br />
                đã bỏ qua
              </Typography.Text>
            </Space>
            <br />
            <Space>
              <Typography className="dashboard-number mt-2">
                {boSttCount}
              </Typography>
              <div className="percent">89%</div>
            </Space>
          </Card>
        </Space>
        <br />
        <Card className="chart-card">
          <Space>
            {" "}
            <div>
              {" "}
              <Typography.Text className="chart-card-text">
                Bảng thống kê theo ngày
              </Typography.Text>
              <p>Tháng 11/2021</p>
            </div>
            <div style={{ marginLeft: "300px" }}></div>
            <div>
              <Typography
                style={{ display: "inline" }}
                className="chart-card-xt"
              >
                Xem theo
              </Typography>
              <Select
                className="select"
                labelInValue
                style={{ width: 100, marginLeft: "20px" }}
                options={[
                  {
                    value: "Ngày",
                    label: "Ngày",
                  },
                  {
                    value: "Tuần",
                    label: "Tuần",
                  },
                  {
                    value: "Tháng",
                    label: "Tháng",
                  },
                ]}
              />
            </div>
          </Space>

          <Area {...config3} />
        </Card>
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
        <Image
          src={imageDevice}
          style={{ marginLeft: "20px", marginTop: "-10px" }}
          preview={false}
        ></Image>
        <Image
          style={{ marginLeft: "20px", marginTop: "-10px" }}
          src={imageService}
          preview={false}
        ></Image>

        <Image
          style={{ marginLeft: "20px", marginTop: "-10px" }}
          src={imageLevel}
          preview={false}
        ></Image>
        <Image
          src={imageDate}
          style={{ marginLeft: "10px" }}
          preview={false}
        ></Image>
      </div>
    </div>
  );
}
export default Dashboard;
