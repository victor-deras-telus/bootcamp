import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useTransactionsGet } from "../queries/transaction";
import { DateTime } from "luxon";
import TransactionsTable from "./TransactionsTable";

const TransactionListing = (title, maxTransactions=5 , categoryFilter = null, accountFilter = null, startDateFilter = undefined, endDateFilter = undefined) => {
  const timeSpan = DateTime.now()
    .minus({
      days: 7,
    })
    .toISODate();

  const [sortingField, setSortingField] = useState("dateSort");
  const [order, setOrder] = useState("desc");
  const [skip, setSkip] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const { data: transactionsData, isFetched} =
    useTransactionsGet({
      firstDate: title.startDateFilter?title.startDateFilter:timeSpan,
      lastDate: title.endDateFilter,
      category: title.categoryFilter,
      account: title.accountFilter,
      [sortingField]: order,
      skip: skip,
      take: title.maxTransactions,
    });

  const { Panel } = Collapse;

  useEffect(() => {
    if (transactionsData) setTransactions(transactionsData.data);
    console.log(transactionsData);
  }, [transactionsData]);

  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel header={title.title} key="1">
        {isFetched ? (
          <TransactionsTable transactionData={transactions} />
        ) : (
          <div>Loading...</div>
        )}
      </Panel>
    </Collapse>
  );
};

export default TransactionListing;
