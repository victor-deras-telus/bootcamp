import { Row, Col, Space, Card } from "antd";

import AccountListing from "../components/accountListing";
import TransactionsCard from "../components/TransactionsCard";
import TransactionListing from "../components/TransactionListing";

const Home = () => {
  return (
    <Space direction="horizontal" size="large" align="baseline">
      <Card>
        <AccountListing />
      </Card>
      <Card>
        <TransactionsCard />
        {TransactionListing("RECENT TRANSACTIONS")}
      </Card>
    </Space>
  );
};

export default Home;
