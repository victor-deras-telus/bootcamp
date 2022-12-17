import { Table } from "antd";
import React from "react";
import { DateTime } from "luxon";


const TransactionsTable = (transactionData) => {
  const transactions = transactionData.transactionData;
  const tableData = [];
  let totalAmount = 0;

  transactions.forEach((item) => {
    totalAmount += item.balance / item.currency.rate;
    let transferDescription = '';
    let transferDirection = '';
    let description = item.info;

    if(item.Account_Transaction_relAccount){
      transferDescription = item.Account_Transaction_relAccount.name;
      transferDirection = parseFloat(item.amount)<0 ? '->':'<-';
      description = `${description} ${transferDirection}${transferDescription} `;
    }
    const record = {
      date: DateTime.fromISO(item.date).toISODate(),
      account: item.Account_Transaction_mainAccount.name,
      category: item.category.name,
      amount: `${parseFloat(item.amount)} ${item.currency.code}`, //.toFixed(item.currency.currency.exp)
      info: description,

    };
    tableData.push(record);
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },     
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
    },
   
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.info}</p>,
        rowExpandable: (record) => record.account !== 'Not Expandable',
      }}
      bordered
    />
  );
};

export default TransactionsTable;
