import React from "react";
import "./Header.scss";
import { Layout, Space, Avatar, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { loggedInAtom, userAtom } from "../../utils/atoms";

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const [selectedUser, setSelectedUser] = useAtom(userAtom);
  const [, setIsLoggedIn] = useAtom(loggedInAtom);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/login");
    setIsLoggedIn(false);
    setSelectedUser(null);
  };
  if (!selectedUser?.id) {
    <b>Loading...</b>;
  }
  return (
    <Layout>
      <AntdHeader className="antd-header">
        <Space wrap>
          <Avatar size={48} icon={<UserOutlined />} />
          <Title
            level={4}
          >{`${selectedUser.firstName} ${selectedUser.lastName}`}</Title>
        </Space>
        <Space wrap>
          <Button type="dashed" onClick={logOut}>
            Log out
          </Button>
        </Space>
      </AntdHeader>
    </Layout>
  );
}
