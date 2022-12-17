import styles from "../styles/transactionComponents/Transactions.module.scss";
import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";
import AddTransactionForm from "../components/transactionComponents/AddTransactionForm";
import DeleteTransactionForm from "../components/transactionComponents/DeleteTransactionForm";
import TransactionListing from "../components/TransactionListing";
const Transactions = () => {
  return (
    <MainContainer>
      <Title>Transactions</Title>
<TransactionListing maxTransactions={200}/>
    </MainContainer>
  );
};

export default Transactions;
