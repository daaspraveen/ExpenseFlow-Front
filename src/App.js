import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import ExpenseFlowContext from "./contexts/expenseFlowContext"

import "./App.css";

class App extends Component{
  state = {username: ''}

  updateUsername = (name) => {
    this.setState({username: name})
  }

  render() {
    const {username} = this.state
  return (
    <ExpenseFlowContext.Provider value={
      {
        userName: username,
        setUserName: this.updateUsername,
      }}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </ExpenseFlowContext.Provider>
  )}
}
export default App;
