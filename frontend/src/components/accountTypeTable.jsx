import { Table } from "antd";
import React from "react";


const AccountTypeTable = (accountTypeData) => {
  const accounts = accountTypeData.accountTypeData.Accounts;
  const tableData = [];
  let totalAmount = 0;

  accounts.forEach((item) => {
    totalAmount += item.balance / item.currency.rate;
    const record = {
      accountId: item.id,
      name: item.name,
      balance: `${parseFloat(item.balance).toFixed(
        item.currency.currency.exp
      )} ${item.currency.code}`,
    };
    tableData.push(record);
  });

  const columns = [
    {
      title: accountTypeData.accountTypeData.name,
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: `${parseFloat(totalAmount).toFixed(2)} USD`,
      dataIndex: "balance",
      key: "balance",
      align: "right",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
    />
  );
};

export default AccountTypeTable;
