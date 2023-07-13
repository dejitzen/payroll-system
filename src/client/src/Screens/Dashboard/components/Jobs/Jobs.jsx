import React, { useEffect, useState } from "react";
import "./Jobs.scss";
import { useAtom } from "jotai";
import { userAtom } from "../../../../utils/atoms";
import { getJobs, getUnpaidJobs, payJob } from "../../../../API/jobs";
import { AutoComplete, Button, Table, Typography, notification } from "antd";
import { getUser } from "../../../../API/profiles";

const { Title } = Typography;

export default function Jobs() {
  const [user, setUser] = useAtom(userAtom);
  const [unpaidJobs, setUnpaidJobs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getPanelValue = (searchText) =>
    !searchText
      ? []
      : unpaidJobs
          .filter((job) =>
            `${job.Contract.Contractor.firstName} ${job.Contract.Contractor.lastName}`
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((job) => ({
            allData: job,
            value: `${job.Contract.Contractor.firstName} ${job.Contract.Contractor.lastName}`,
          }));

  const onSelect = (_, val) => {
    setValue(val.allData);
  };

  useEffect(() => {
    const getJobsData = async () => {
      const data = await getUnpaidJobs(user.id);
      console.log(data, "DATAUNPAID");
      if (data.error) {
        setError(true);
      } else {
        setUnpaidJobs(data);
        setOptions(
          data.map((job) => ({
            allData: job,
            value: `${job.Contract.Contractor.firstName} ${job.Contract.Contractor.lastName}`,
          }))
        );
      }
    };
    if (user.id) {
      getJobsData();
    }
  }, [user]);

  const getJobsPerContractor = async () => {
    setShouldShow(true);
    setLoading(true);
    const data = await getJobs(value.Contract.Contractor.id);
    if (data.error) {
      notification.error(JSON.stringify(data.error));
    } else {
      setJobs(data);
    }
    setLoading(false);
  };
  const pay = async (id) => {
    const data = await payJob(id);
    if (data.error) {
      notification.error("Error while paying");
    } else {
      const updatedUser = await getUser();
      setUser(updatedUser);
      getJobsPerContractor();
    }
  };

  const columns = [
    {
      title: "Profession",
      key: "profession",
      render: () => value.Contract.Contractor.profession,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "paid",
      render: (item, allData) =>
        !item ? (
          <Button type="primary" onClick={() => pay(allData.id)}>
            Pay
          </Button>
        ) : (
          <b>Paid</b>
        ),
    },
  ];

  if (error) {
    return null;
  }

  return (
    <div className="unpaid-jobs-wrapper">
      <Title>Quick pay</Title>
      <div className="pay-jobs-for">
        <label>Pay Jobs for </label>
        <AutoComplete
          options={options}
          style={{ width: 180 }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue(text))}
          placeholder="Search contractor"
        />
        {value && (
          <Button
            type="primary"
            disabled={!value}
            onClick={getJobsPerContractor}
          >
            Continue
          </Button>
        )}
      </div>
      {shouldShow && (
        <div className="job-list">
          <Table columns={columns} dataSource={jobs} loading={loading} />
        </div>
      )}
    </div>
  );
}
