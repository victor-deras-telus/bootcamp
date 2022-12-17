import React, { useEffect, useState } from "react";
import AccountForm from "../components/AccountForm";
import AccountsTable from "../components/AccountsTable";
import { useAccountsGet } from "../queries/account";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { data: accountData, isFetched: isAccountsFetched } = useAccountsGet();

  useEffect(() => {
    if (accountData) setAccounts(accountData.data);
    console.log(accountData);
  }, [accountData]);

  return (
    <div>
      {isAccountsFetched ? (
        
        <div><AccountsTable accountsData={accountData.data} />
        <AccountForm accountsData={accountData.data}  /></div>
      ) : (
        <div>Loading...</div>
      )}

    </div>
  );
};

export default Accounts;
