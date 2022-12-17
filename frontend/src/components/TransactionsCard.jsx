import { Card, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import { useAccountsGet } from "../queries/account";
import { useCategoriesGet } from "../queries/category";

const TransactionsCard = () => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data: accountData, isFetched: isAccountsFetched } = useAccountsGet();

  const { data: categoryData, isFetched: isCategoryFetched } =
    useCategoriesGet();

  useEffect(() => {
    if (accountData) setAccounts(accountData.data);
    console.log(accountData);
  }, [accountData]);

  useEffect(() => {
    if (categoryData) setCategories(categoryData.data);
    console.log(categoryData);
  }, [categoryData]);

  const { Panel } = Collapse;

  const tabList = [
    {
      key: "Expense",
      tab: "Expense",
    },
    {
      key: "Transfer",
      tab: "Transfer",
    },
    {
      key: "Income",
      tab: "Income",
    },
  ];

  const [activeTabKey1, setActiveTabKey1] = useState("Expense");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel header="NEW TRANSACTION" key="1">
        <Card
          style={{ width: "100%" }}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={(key) => {
            onTab1Change(key);
          }}
        >
          {isAccountsFetched && isCategoryFetched ? (
            <TransactionForm
              transactionType={activeTabKey1}
              categoriesData={categories}
              accountsData={accounts}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Card>
      </Panel>
    </Collapse>
  );
};

export default TransactionsCard;
