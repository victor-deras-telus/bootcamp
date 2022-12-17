import { Row, Col } from "antd";

import AccountListing from "../components/accountListing";
import TransactionsCard from "../components/TransactionsCard";
import TransactionListing from "../components/TransactionListing";

const Home = () => {
  return (
    <Row gutter={100}>
      <Col>
        <AccountListing />
      </Col>
      <Col>
        <Row>
          <TransactionsCard />
        </Row>
        <Row>
          <TransactionListing />
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
