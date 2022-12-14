import { Table } from "antd";
import React from "react";

const AccountsTable = (accountsData) => {
  const tableData = [];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },    
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    }, 
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      align: "right",
    },    
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
    },
  ];

  accountsData.accountsData.forEach((item) => {
    item.Accounts.forEach((account) => {
      const record = {
        name: account.name,
        type: item.name,
        balance: `${parseFloat(account.balance)} ${account.currencyId}`, //.toFixed(item.currency.currency.exp)
        currency: account.currencyId,
        rate: account.currency.rate,
      };
      tableData.push(record);
    });
  });

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered
    />
  );
};

export default AccountsTable;
