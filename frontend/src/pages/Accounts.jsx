import { Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import AccountForm from "../components/AccountForm";
import AccountsTable from "../components/AccountsTable";
import { useAccountsGet } from "../queries/account";
import { useCurrenciesGet } from "../queries/currency";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { data: accountData, isFetched: isAccountsFetched } = useAccountsGet();

  useEffect(() => {
    if (accountData) setAccounts(accountData.data);
    console.log(accountData);
  }, [accountData]);

  const [currencies, setCurrencies] = useState([]);
  const { data: currencyData, isFetched: isCurrencyDataFetched } = useCurrenciesGet();

  useEffect(() => {
    if (currencyData) setCurrencies(currencyData.data);
    console.log(currencyData);
  }, [currencyData]);

  return (
    <div>
      {(isCurrencyDataFetched && isAccountsFetched) ? (
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Card>
            <AccountsTable accountsData={accountData.data} />
          </Card>
          <Card>
            <AccountForm accountsData={accountData.data} currenciesData={currencyData.data} />
          </Card>
        </Space>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Accounts;
