import React from "react";
import "./TopUp.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography, notification } from "antd";
import { topUpBalance } from "../../../../API/balance";
import { useAtom } from "jotai";
import { userAtom } from "../../../../utils/atoms";
const { Title } = Typography;

export default function TopUp() {
  const topUpAmounts = [1, 5, 10, 50, 100, 500];
  const [user, setUser] = useAtom(userAtom);
  const handleTopUp = async (topUpAmount) => {
    const data = await topUpBalance(user.id, topUpAmount);
    console.log(data, "DATAAA");
    if (data.error) {
      notification.error({ message: data.error.response.data.error });
    } else {
      notification.success({
        message: `${topUpAmount} deposited successfully`,
      });
      setUser({ ...user, balance: user.balance + topUpAmount });
    }
  };

  return (
    <div className="top-up">
      <Title level={4}>
        Top up your balance
        <Tooltip
          placement="bottom"
          title={`You can't deposit more than 25% of your total of jobs to pay`}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </Title>
      <div className="top-up-items">
        {topUpAmounts.map((topUpAmount) => (
          <Button
            className="top-up-item"
            onClick={() => handleTopUp(topUpAmount)}
          >
            {topUpAmount}
          </Button>
        ))}
      </div>
    </div>
  );
}
