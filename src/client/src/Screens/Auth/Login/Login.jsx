import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useAtom } from "jotai";
import { loggedInAtom, userAtom } from "../../../utils/atoms";
import { getAllProfiles } from "../../../API/profiles";
import { Typography, Select, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [, setSelectedUser] = useAtom(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedInAtom);
  const [dropdownUser, setDropdownUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    setSelectedUser(dropdownUser);
    setIsLoggedIn(true);
  };

  const handleUserChange = (id) => {
    const user = users.find((usr) => usr.id === id);
    setDropdownUser(user);
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getAllProfiles("client");
      if (data.error) {
        setError(true);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };
    getUsers();
  }, []);
  if (loading) {
    return <b>Loading...</b>;
  } else if (error) {
    return <b>Error</b>;
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <Title color="#fff">Login</Title>
        <Space wrap>
          <Select
            style={{
              width: "250px",
            }}
            loading={loading}
            value={dropdownUser.id}
            placeholder={"Select user"}
            onChange={handleUserChange}
            options={users.map((usr) => ({
              allData: usr,
              value: usr.id,
              label: `${usr.firstName} ${usr.lastName}`,
            }))}
          />

          <Button
            type="primary"
            disabled={!dropdownUser.id}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Space>
      </div>
    </div>
  );
}
