import React from "react";
import { Typography } from "antd/";
import { WalletOutlined } from "@ant-design/icons";
import "./Balance.scss";
import { useAtom } from "jotai";
import { userAtom } from "../../../../utils/atoms";
const { Title } = Typography;

export default function Balance() {
  const [user] = useAtom(userAtom);

  return (
    <div className="balance-container">
      <div className="icon-and-text">
        <div className="icon-container">
          <WalletOutlined />
        </div>
        <div className="text">
          <Title level={5}>Your balance</Title>
          <Title>{Number(user.balance).toFixed(1)}</Title>
        </div>
      </div>
    </div>
  );
}
