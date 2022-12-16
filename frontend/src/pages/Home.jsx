import { useState } from "react";
import Searchbar from "../components/homeComponents/Searchbar";
import { Title } from "../components/Titles/Titles";
import CategoryCard from "../components/Cards/CategoryCard";
import TransactionCard from "../components/Cards/TransactionCard";
import styles from "../styles/homeComponents/Home.module.scss";
import HomeProfile from "../components/homeComponents/HomeProfile";

import { DateTime } from "luxon";
import { useTransactionsGet } from "../queries/transaction";
import { useCategoriesSum } from "../queries/category";
import { useEffect } from "react";
import {
  Card,
  Table,
  Collapse,
  Tag,
  Space,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
} from "antd";
import {
  MANDATORY_FIELD_CONF,
  NO_WHITESPACE_ONLY,
} from "../constants/formConstants";
import AccountListing from "../components/accountListing";
import TransactionsCard from "../components/TransactionsCard";

const columns = [
  {
    title: "Bank Account",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "right",
  },
];

const data = [
  {
    key: "1",
    name: "Bank of America",
    balance: 500,
  },
  {
    key: "2",
    name: "JPOST Bank",
    balance: 45000,
  },
];
const tabList = [
  {
    key: "expense",
    tab: "Expense",
  },
  {
    key: "transfer",
    tab: "Transfer",
  },
  {
    key: "income",
    tab: "Income",
  },
];

const contentList = {
  expense: (
    <Form layout="vertical" onSubmit={e => e.preventDefault()}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="From"
            name="account"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="USD"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="account"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="date"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} align={"middle"}>
        <Col span={12}>
          <Form.Item
            label="Description"
            name="description"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button type={"primary"}>Add Expense</Button>
        </Col>
      </Row>
    </Form>
  ),
  transfer: (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="From"
            name="account"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="amount"
            label="USD"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
          
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="to"
            name="accountTo"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="date"
            label="date"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} justify="space-between" align="bottom">
        <Col span={6}>
          <Form.Item
            label="Description"
            name="description"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6} align="bottom">
          <Button>Add Transfer</Button>
        </Col>
      </Row>
    </Form>
  ),
  income: (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="From"
            name="account"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="amount"
            label="USD"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="Category"
            name="account"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="date"
            label="date"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} justify="space-between" align="bottom">
        <Col span={6}>
          <Form.Item
            label="Description"
            name="description"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6} align="bottom">
          <Button>Add Income</Button>
        </Col>
      </Row>
    </Form>
  ),
};

const { Panel } = Collapse;

const Home = () => {
  //LATEST TRS
  const { data: transactions, refetch: fetchTransactions } = useTransactionsGet(
    {
      key: "Trs_Latest",
      skip: 0,
      take: 5,
    }
  );
  const [activeTabKey1, setActiveTabKey1] = useState("expense");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

/*   const { data: CategoriesSum } = useCategoriesSum();
  useEffect(() => {
    fetchTransactions();
  }, []); */

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
          <Collapse bordered={false} defaultActiveKey={["1"]}>
            <Panel header="RECENT TRANSACTIONS" key="1">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
              />
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
              />
            </Panel>
          </Collapse>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
