import React, { useState } from "react";
import "./Stats.scss";
import Header from "../../Components/Header/Header";
import { DatePicker, Table, Typography, notification } from "antd";
import { getBestClients, getBestProffession } from "../../API/admin";

const { RangePicker } = DatePicker;
const { Title } = Typography;

export default function Stats() {
  const [timeRange, setTimeRange] = useState(null);
  const [bestProfession, setBestProfession] = useState(null);
  const [bestClients, setBestClients] = useState([]);

  const onRangeChange = async (date, strings) => {
    if (date) {
      setTimeRange(strings);
      const data = await getBestProffession(strings[0], strings[1]);
      if (data.error) {
        notification.error({ message: "Error while getting best profession" });
      } else {
        setBestProfession(data.profession);
      }
      const bestClientsData = await getBestClients(strings[0], strings[1]);
      if (bestClientsData.error) {
        notification.error({ message: "Error while getting best clients" });
      } else {
        setBestClients(bestClientsData);
      }
    } else {
      setTimeRange(null);
    }
  };

  const columns = [
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
    },
  ];

  return (
    <div className="stats-container">
      <div className="stats">
        <div className="time-picker">
          <Title level={5}>Select range to see stats</Title>
          <RangePicker format="YYYY/MM/DD" onChange={onRangeChange} />
        </div>
        {timeRange && (
          <>
            <Title level={5}>Best profession is: {bestProfession}</Title>
            <div className="best-clients">
              <Title level={5}>Best clients for the selected dates</Title>
              <Table dataSource={bestClients} columns={columns} />;
            </div>
          </>
        )}
      </div>
    </div>
  );
}
