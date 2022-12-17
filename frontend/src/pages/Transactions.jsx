import styles from "../styles/transactionComponents/Transactions.module.scss";
import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";
import { useAccountsGet } from "../queries/account";
import { useCategoriesGet } from "../queries/category";
import { useEffect, useState } from "react";
import TransactionFilteredTable from "../components/TransactionFilteredTable";
const Transactions = () => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data: accountData, isFetched: isAccountsFetched } = useAccountsGet();

  const { data: categoryData, isFetched: isCategoryFetched } = useCategoriesGet();

  useEffect(() => {
    if (accountData) setAccounts(accountData.data);
    console.log(accountData);
  }, [accountData]);

  useEffect(() => {
    if (categoryData) setCategories(categoryData.data);
    console.log(categoryData);
  }, [categoryData]);

 
  return (
    <MainContainer>
      <Title>Transactions</Title>
      {(isAccountsFetched && isCategoryFetched) ? (
        <TransactionFilteredTable 
          categoriesData={categories}
          accountsData={accounts} />
      ) : (
        <div>Loading...</div>
      )}
    </MainContainer>
  );
};

export default Transactions;
