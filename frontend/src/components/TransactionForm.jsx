import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
  InputNumber,
} from "antd";
import React, { useEffect } from "react";
import { useTransactionPost } from "../queries/transaction";
import { useAccountUpdate } from "../queries/account";
import { queryClient } from "../constants/config";
import {
  MANDATORY_FIELD_CONF,
  NO_WHITESPACE_ONLY,
} from "../constants/formConstants";

const TransactionForm = (transactionType, categoriesData, accountsData) => {
  const dateFormat = "YYYY/MM/DD";
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
    mutate: postTransaction,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useTransactionPost();

  const {
    mutate: updateAccount,
    isLoading: isLoadingUpdateAccount,
    isError: isErrorUpdateAccount,
    isSuccess: isSuccessUpdateAccount,
    error: errorUpdateAccount,
  } = useAccountUpdate();

  const [transactionForm] = Form.useForm();
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
          balance: item.balance,
        });
      });
    });
    return result;
  };

  const getTypeId = (type) => {
    return type === "Expense" ? 1 : type === "Income" ? 2 : 3;
  };

  const submitTransactionForm = async () => {
    let newTransactionRecord = await transactionForm.validateFields();
    let postInput;
    let accountInput;
    const transactionTypeText = transactionType.transactionType;

    const accountsData = getAccountOptions(transactionType.accountsData);
    const mainAccount = accountsData.filter(
      (item) => item.value === newTransactionRecord.account
    );

    if (transactionTypeText === "Expense") {
      if (
        parseFloat(newTransactionRecord.amount) >
        parseFloat(mainAccount[0].balance)
      ) {
        errorMsg("ERROR: Account has insufficient funds!");
        return;
      }

      postInput = {
        title: transactionTypeText,
        amount: parseFloat(newTransactionRecord.amount) * -1,
        info: newTransactionRecord.description,
        date: newTransactionRecord.date,
        transactionTypeId: getTypeId(transactionTypeText),
        transactionCategoryId: newTransactionRecord.category,
        currencyId: mainAccount[0].currency,
        accountId: newTransactionRecord.account,
      };

      const newBalance =
        parseFloat(mainAccount[0].balance) -
        parseFloat(newTransactionRecord.amount);
      accountInput = {
        id: newTransactionRecord.account,
        balance: newBalance,
      };
      postTransaction(postInput, {
        onSuccess: async () => {},
        onError: async () => {
          console.log(error);
        },
      });

      updateAccount(accountInput, {
        onSuccess: async () => {
          await queryClient.invalidateQueries("Accounts");
          await queryClient.invalidateQueries("Transactions");
          
          successMsg(`${transactionTypeText} Transaction Created`);
        },
      });
    }

    if (transactionTypeText === "Transfer") {
      const relAccountId = newTransactionRecord.category;
      const relAccount = accountsData.filter(
        (item) => item.value === relAccountId
      );
      if (
        parseFloat(newTransactionRecord.amount) >
        parseFloat(mainAccount[0].balance)
      ) {
        errorMsg("ERROR: Account has insufficient funds!");
        return;
      }
      if (relAccountId === newTransactionRecord.account) {
        errorMsg("ERROR: Choose a different account!");
        return;
      }
      postInput = {
        title: transactionTypeText,
        amount: parseFloat(newTransactionRecord.amount) * -1,
        info: newTransactionRecord.description,
        date: newTransactionRecord.date,
        transactionTypeId: getTypeId(transactionTypeText),
        transactionCategoryId: 13,
        currencyId: mainAccount[0].currency,
        accountId: newTransactionRecord.account,
        relAccountId: relAccountId,
      };
      postTransaction(postInput, {
        onSuccess: async () => {},
        onError: async () => {
          console.log(error);
        },
      });

      const newBalanceSource =
        parseFloat(mainAccount[0].balance) -
        parseFloat(newTransactionRecord.amount);
      accountInput = {
        id: newTransactionRecord.account,
        balance: newBalanceSource,
      };
      updateAccount(accountInput, {
        onSuccess: async () => {
          await queryClient.invalidateQueries("Accounts");
          await queryClient.invalidateQueries("Transactions");          
          successMsg(`${transactionTypeText} Transaction Created`);
        },
      });

      postInput = {
        title: transactionTypeText,
        amount: parseFloat(newTransactionRecord.amount),
        info: newTransactionRecord.description,
        date: newTransactionRecord.date,
        transactionTypeId: getTypeId(transactionTypeText),
        transactionCategoryId: 13,
        currencyId: relAccount[0].currency,
        relAccountId: newTransactionRecord.account,
        accountId: relAccountId,
      };
      postTransaction(postInput, {
        onSuccess: async () => {},
        onError: async () => {
          console.log(error);
        },
      });

      const newBalanceDestiny =
        parseFloat(relAccount[0].balance) +
        parseFloat(newTransactionRecord.amount);
      accountInput = {
        id: relAccountId,
        balance: newBalanceDestiny,
      };
      updateAccount(accountInput, {
        onSuccess: async () => {
          await queryClient.invalidateQueries("Accounts");
          await queryClient.invalidateQueries("Transactions");          
          successMsg(`${transactionTypeText} Transaction Created`);
        },
      });
    }

    if (transactionTypeText === "Income") {
      postInput = {
        title: transactionTypeText,
        amount: parseFloat(newTransactionRecord.amount),
        info: newTransactionRecord.description,
        date: newTransactionRecord.date,
        transactionTypeId: getTypeId(transactionTypeText),
        transactionCategoryId: newTransactionRecord.category,
        currencyId: mainAccount[0].currency,
        accountId: newTransactionRecord.account,
      };

      const newBalance =
        parseFloat(newTransactionRecord.amount) +
        parseFloat(mainAccount[0].balance);
      accountInput = {
        id: newTransactionRecord.account,
        balance: newBalance,
      };
      postTransaction(postInput, {
        onSuccess: async () => {},
        onError: async () => {
          console.log(error);
        },
      });

      updateAccount(accountInput, {
        onSuccess: async () => {
          await queryClient.invalidateQueries("Accounts");
          await queryClient.invalidateQueries("Transactions");          
          successMsg(`${transactionTypeText} Transaction Created`);
        },
      });
    }
  };

  const getCategoryOptions = (dataCats, type) => {
    const result = [];
    dataCats.forEach((category) => {
      if (category.type.name === type) {
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
      secondaryOptions: getCategoryOptions(
        transactionType.categoriesData,
        transactionType.transactionType
      ),
    },
    Transfer: {
      accountLabel: "Source",
      ammountLabel: `Amount`,
      categoryLabel: "Destiny",
      descriptionLabel: "Description",
      dateLabel: "Date",
      buttonLabel: "Add Transfer",
      secondaryOptions: getAccountOptions(transactionType.accountsData),
    },
    Income: {
      accountLabel: "Account",
      ammountLabel: `Amount`,
      categoryLabel: "Category",
      descriptionLabel: "Description",
      dateLabel: "Date",
      buttonLabel: "Add Income",
      secondaryOptions: getCategoryOptions(
        transactionType.categoriesData,
        transactionType.transactionType
      ),
    },
  };

  const getConfig = (config, type, field) => {
    const configuration = config[type.transactionType];
    return configuration[field];
  };

  useEffect(() => {
    transactionForm.resetFields();
  }, [transactionType]);

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onSubmit={(e) => e.preventDefault()}
        form={transactionForm}
      >
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
              <InputNumber min="0.01" step="0.01" stringMode />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={getConfig(config, transactionType, "categoryLabel")}
              name="category"
              rules={[MANDATORY_FIELD_CONF]}
            >
              <Select
                options={getConfig(config, transactionType, "secondaryOptions")}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date"
              label={getConfig(config, transactionType, "dateLabel")}
            >
              <DatePicker format={dateFormat} />
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
            <Button type={"primary"} onClick={submitTransactionForm}>
              {isLoading
                ? "Loading..."
                : getConfig(config, transactionType, "buttonLabel")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default TransactionForm;
