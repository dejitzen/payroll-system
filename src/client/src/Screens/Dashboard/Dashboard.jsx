import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useAtom } from "jotai";
import { loggedInAtom, userAtom } from "../../utils/atoms";

import { useNavigate } from "react-router-dom";
import Balance from "./components/Balance/Balance";
import TopUp from "./components/TopUp/TopUp";
import Jobs from "./components/Jobs/Jobs";
import { getUser } from "../../API/profiles";
import Header from "../../Components/Header/Header";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import Stats from "../Stats/Stats";

const { Title } = Typography;

export default function Dashboard() {
  const [isLoggedIn] = useAtom(loggedInAtom);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    const updateUser = async () => {
      const updatedUser = await getUser();
      setUser(updatedUser);
    };
    updateUser();
  }, [setUser]);

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="row">
        <div className="profile-data">
          <div className="user">
            <Avatar
              style={{ backgroundColor: "#001529" }}
              size={80}
              icon={<UserOutlined />}
            />
            <div>
              <Title level={4}>{`${user.firstName} ${user.lastName}`}</Title>
              <Title level={5}>{user.profession}</Title>
            </div>
          </div>
          <div className="balance-wrapper">
            <Balance />
            <TopUp />
          </div>
        </div>
        <div className="jobs-section">
          <Jobs />
        </div>
        <Stats />
      </div>
    </div>
  );
}
