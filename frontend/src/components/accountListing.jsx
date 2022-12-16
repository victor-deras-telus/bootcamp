import { Collapse } from "antd";
import React from "react";
import { useAccountsGet } from "../queries/account";
import { useState, useEffect } from "react";
import AccountTypeTable from "./accountTypeTable";
import styles from "../styles/accountListing.module.scss";

const AccountListing = () => {
  const { Panel } = Collapse;
  const [accounts, setAccounts] = useState([]);
  const { data: accountData, isFetched: isAccountsFetched } = useAccountsGet();

  useEffect(() => {
    if (accountData) setAccounts(accountData.data);
    console.log(accountData);
  }, [accountData]);


  const getAccountsTotal = (accountsObject) => {
    let totalAmount = 0;

    accountsObject.forEach((accountType) => {
      const accountsData = accountType.Accounts;

      accountsData.forEach((item) => {
        totalAmount += item.balance / item.currency.rate;
      });
    });

    return `TOTAL IN ACCOUNTS ${parseFloat(totalAmount).toFixed(2)} USD`;

  };

  return (
    <div>
      {isAccountsFetched ? (
        <Collapse bordered={false} defaultActiveKey={["1"]} className={styles.StyledCollapse}>
          <Panel header={getAccountsTotal(accounts)} key="1">
            {accounts.map((account) => {
              return <AccountTypeTable accountTypeData={account} />;
            })}
          </Panel>
        </Collapse>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AccountListing;
