import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useTransactionsGet } from "../queries/transaction";
import { DateTime } from "luxon";
import TransactionsTable from "./TransactionsTable";

const TransactionListing = (maxTransactions=5) => {
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
      firstDate: timeSpan,
      category: undefined,
      account:undefined,
      [sortingField]: order,
      skip: skip,
      take: maxTransactions.maxTransactions,
    });

  const { Panel } = Collapse;

  useEffect(() => {
    if (transactionsData) setTransactions(transactionsData.data);
    console.log(transactionsData);
  }, [transactionsData]);

  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel header="RECENT TRANSACTIONS" key="1">
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
