import { Button, Col, Form, Input, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useAccountPost } from "../queries/account";
import { useCurrenciesPost } from "../queries/currency";
import { queryClient, CURRENCY_RATES } from "../constants/config";
import { MANDATORY_FIELD_CONF } from "../constants/formConstants";

const AccountForm = (accountsData, currenciesData) => {
  const [messageApi, contextHolder] = message.useMessage();

  const errorMsg = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const successMsg = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const {
    mutate: postAccount,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useAccountPost();

  const {
    mutate: postCurrency,
    isLoading: isLoadingCurrency,
    isError: isErrorCurrency,
    isSuccess: isSuccessCurrency,
    error: errorCurrency,
  } = useCurrenciesPost();

  const [accountPostForm] = Form.useForm();

  const getAccountOptions = (dataAccounts) => {
    const result = [];
    dataAccounts.forEach((accountType) => {
      result.push({
        label: accountType.name,
        value: accountType.id,
      });
    });
    return result;
  };

  const submitAccountForm = async () => {
    let newAccountRecord = await accountPostForm.validateFields();

    let rate = 1;
    if(newAccountRecord.currencyId !== 'USD'){
      const exchangeRateData = CURRENCY_RATES.filter(item => item.id=== `USD${newAccountRecord.currencyId}`);
      if(exchangeRateData.length>0){
        rate = parseFloat(exchangeRateData[0].rate);
      }
      
    }
    let currencyInput;
    currencyInput = {
      code: newAccountRecord.currencyId,
      rate: rate,
    };
    await postCurrency(currencyInput, {
      onSuccess: async () => {
        await queryClient.invalidateQueries("Accounts");
        await queryClient.invalidateQueries("Transactions");
        successMsg(`${accountInput.name} Account Created`);
      },
      onError: async () => {
        console.log(error);
      },
    });

    let accountInput;
    accountInput = {
      accountType: newAccountRecord.accountType,
      name: newAccountRecord.accountName,
      currencyId: newAccountRecord.currencyId,
    };

    postAccount(accountInput, {
      onSuccess: async () => {
        await queryClient.invalidateQueries("Accounts");
        await queryClient.invalidateQueries("Transactions");
        successMsg(`${accountInput.name} Account Created`);
      },
      onError: async () => {
        console.log(error);
      },
    });

    accountPostForm.resetFields();


    
  };

  const getCurrencyOptions = (currencies) => {
    const result = [];
    currencies.forEach((currency) => {
      result.push({
        label: `${currency.code} - ${currency.name}`,
        value: currency.code,
      });
    });
    return result;
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onSubmit={(e) => e.preventDefault()}
        form={accountPostForm}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Account Name"
              name="accountName"
              rules={[MANDATORY_FIELD_CONF]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accountType"
              label="Account Type"
              rules={[MANDATORY_FIELD_CONF]}
            >
              <Select options={getAccountOptions(accountsData.accountsData)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} align={"middle"}>
          <Col span={12}>
            <Form.Item
              name="currencyId"
              label="Currency"
              rules={[MANDATORY_FIELD_CONF]}
            >
              <Select
                options={getCurrencyOptions(accountsData.currenciesData)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button type={"primary"} onClick={submitAccountForm}>
              {isLoading ? "Loading..." : "Create Account"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AccountForm;
