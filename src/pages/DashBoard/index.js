import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HistoryTable from "../../components/HistoryTable";
import AddTransForm from "../../components/AddTransForm";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../api/api";
import ExpenseFlowContext from "../../contexts/expenseFlowContext";

import { MdOutlineCurrencyRupee } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
// import { AiFillMinusCircle } from "react-icons/ai";
import "./styledComponents.css";

const DashBoard = () => {
  const { userName } = useContext(ExpenseFlowContext);
  const [transactions, setTransactions] = useState([]);
  const [incomeValue, setIncomeVal] = useState(0);
  const [expensesValue, setExpensesVal] = useState(0);
  const [balanceValue, setBalanceVal] = useState(0);
  // const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt_token");
  // console.log('loading', loading)

  const startFetchTrans = useCallback(async () => {
    try {
      const expsData = await getTransactions(token);
      setTransactions(expsData);
      calcTotal(expsData);
    } catch (e) {
      console.error("Failed to fetch transactions", e);
    }
    // finally {
    // setLoading(false)
    // }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      startFetchTrans();
    }
  }, [navigate, token, startFetchTrans]);

  const calcTotal = (transData) => {
    const total_income = transData
      .filter((each) => each.category === "Income")
      .reduce((prev, eachTrans) => prev + parseFloat(eachTrans.amount), 0);

    const total_expenses = transData
      .filter((each) => each.category === "Expense")
      .reduce((prev, eachTrans) => prev + parseFloat(eachTrans.amount), 0);

    setIncomeVal(total_income);
    setExpensesVal(total_expenses);
    setBalanceVal(total_income - total_expenses);
  };

  // Add Trans Form Submit Func
  const onAddTrans = async (newTrans) => {
    try {
      await addTransaction(token, newTrans);
      startFetchTrans();
    } catch (e) {
      console.error("Error in Adding Transaction", e);
    }
  };

  // handling updated trans data
  const onUpdateTrans = async (updatedTrans) => {
    try {
      await updateTransaction(token, updatedTrans);
      setTransactions((prevState) =>
        prevState.map((item) =>
          item.id === updatedTrans.id ? updatedTrans : item
        )
      );
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // Delete Trans Btn Func
  const onDelTrans = async (transId) => {
    try {
      await deleteTransaction(token, transId);
      startFetchTrans();
    } catch (e) {
      console.error("Error in Deleting Transaction", e);
    }
  };

  const renderBalanceCards = () => (
    <>
      <div className="balance-card card-income">
        <h3 className="balance-card-head">Total Income</h3>
        <div className="balance-info-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2936/2936758.png"
            loading="lazy"
            alt="income"
            className="balance-card-img"
          />
          <p className="balance-card-info">
            <MdOutlineCurrencyRupee size={30} />
            {incomeValue} <span className="currency-zeros">.00</span>
          </p>
        </div>
      </div>
      <div className="balance-card card-balance">
        <h3 className="balance-card-head">Total Balance</h3>
        <div className="balance-info-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/600/600277.png"
            loading="lazy"
            alt="balance"
            className="balance-card-img"
          />
          <p className="balance-card-info">
            <MdOutlineCurrencyRupee size={30} />
            {balanceValue} <span className="currency-zeros">.00</span>
          </p>
        </div>
      </div>
      <div className="balance-card card-expenses">
        <h3 className="balance-card-head">Total Expenses</h3>
        <div className="balance-info-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2936/2936762.png"
            loading="lazy"
            alt="expenses"
            className="balance-card-img"
          />
          <p className="balance-card-info">
            <MdOutlineCurrencyRupee size={30} />
            {expensesValue} <span className="currency-zeros">.00</span>
          </p>
        </div>
      </div>
    </>
  );

  const renderFormBox = () => (
    <>
      <div className="add-trans-head-box">
        <h3 className="add-trans-head">Add Transaction</h3>
        <button type="button" className="form-toggle-btn">
          <AiFillPlusCircle size={30} />
        </button>
      </div>
      <p className="section-intro-para">
        Quickly add and categorize transactions to manage your expenses
        efficiently.
      </p>
      <AddTransForm onSubmitFunc={onAddTrans} />
    </>
  );

  const renderHistory = () => (
    <div className="history-box">
      <h3 className="history-box-head">Transactions History</h3>
      <p className="section-intro-para">
        Track your past expenses and stay updated with your spending history.
      </p>
      <HistoryTable
        transHistoryData={transactions}
        onDeleteFunc={onDelTrans}
        onUpdateFunc={onUpdateTrans}
      />
    </div>
  );

  return (
    <div className="home-container">
      <Header />
      <main className="main-container">
        <div className="greeting-box">
          <h1 className="greeting-head">
            Welcome &nbsp;
            {userName
              ? userName
                  .trim()
                  .split("   ")
                  .map(
                    (each) =>
                      each[0].toUpperCase() + each.slice(1).toLowerCase()
                  )
                  .join(" ")
              : "U"}
          </h1>
          <p className="greeting-para">
            Track and manage your expenses with ease on Expense Flow!
          </p>
        </div>

        {/* ==== BALANCE CARDS ==== */}
        <section className="balance-section">{renderBalanceCards()}</section>

        {/* ==== FORM ==== */}
        <section className="form-section">{renderFormBox()}</section>

        {/* ==== HISTORY ==== */}
        <section className="history-section">{renderHistory()}</section>
      </main>
      <Footer />
    </div>
  );
};

export default DashBoard;
