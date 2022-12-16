import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  MANDATORY_FIELD_CONF,
  NO_WHITESPACE_ONLY,
} from "../constants/formConstants";

const TransactionForm = (transactionType, categoriesData, accountsData) => {
  const getAccountOptions = (dataAccounts) => {
    const result = [];
    dataAccounts.forEach((accountType) => {
      const accounts = accountType.Accounts;

      accounts.forEach((item) => {
        result.push({
          label: item.name,
          value: item.id,
          currency: item.currency.code,
          rate: item.currency.rate,
        });
      });
    });
    return result;
  };

  const getCategoryOptions = (dataCats, type) => {
    const result = [];
    dataCats.forEach((category) => {
      if (category.type.name === type){
        result.push({
            label: category.name,
            value: category.id,
            key: `key-${category.id}`,
          });
      }

    });
    return result;
  };

  const config = {
    Expense: {
      accountLabel: "Account",
      ammountLabel: `Amount`,
      categoryLabel: "Category",
      descriptionLabel: "Description",
      dateLabel: "Date",
      buttonLabel: "Add Expense",
    },
    Transfer: {
      accountLabel: "Source",
      ammountLabel: `Amount`,
      categoryLabel: "Destiny",
      descriptionLabel: "Description",
      dateLabel: "Date",
      buttonLabel: "Add Transfer",
    },
    Income: {
      accountLabel: "Account",
      ammountLabel: `Amount`,
      categoryLabel: "Category",
      descriptionLabel: "Description",
      dateLabel: "Date",
      buttonLabel: "Add Income",
    },
  };

  const getConfig = (config, type, field) => {
    const configuration = config[type.transactionType];
    return configuration[field];
  };

  return (
    <Form layout="vertical" onSubmit={(e) => e.preventDefault()}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={getConfig(config, transactionType, "accountLabel")}
            name="account"
            rules={[MANDATORY_FIELD_CONF]}
          >
            <Select
              name="account"
              options={getAccountOptions(transactionType.accountsData)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="amount"
            label={`${getConfig(config, transactionType, "ammountLabel")}`}
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={getConfig(config, transactionType, "categoryLabel")}
            name="category"
            rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
          >
            <Select
              options={getCategoryOptions(
                transactionType.categoriesData,
                transactionType.transactionType
              )}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label={getConfig(config, transactionType, "dateLabel")}
            rules={[MANDATORY_FIELD_CONF]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} align={"middle"}>
        <Col span={12}>
          <Form.Item
            label={getConfig(config, transactionType, "descriptionLabel")}
            name="description"
            rules={[MANDATORY_FIELD_CONF]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button type={"primary"}>
            {getConfig(config, transactionType, "buttonLabel")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionForm;
