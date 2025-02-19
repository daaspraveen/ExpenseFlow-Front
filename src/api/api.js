import axios from "axios";

// Your backend URL
const BASE_URL = "https://expenseflow-backend.onrender.com"; 

// Signup Function
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username,
      email,
      password,
    });
    // console.log("User Registered:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
}

// Login Function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    // console.log("Resp:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
}

// Add Expense Function
export const addTransaction = async (token, transactionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/expenses`, transactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Get Expenses Function
export const getTransactions = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("User Expenses:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching expenses:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
}

// Delete Expense Function
export const deleteTransaction  = async(token, expenseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Expense Deleted:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error deleting expense:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
}

// Updating Expense Trans Data
export const updateTransaction = async (token, transData) => {
  // console.log('in api transData',transData)
  try {
    const response = await axios.put(
      `${BASE_URL}/expenses/${transData.id}`, 
      transData, 
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

