import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./UsersSlice/UsersSlice";
import transactionsSlice from "./TransactionsSlice/TransactionsSlice";

const rootReducer = combineReducers({
  usersSlice,
  transactionsSlice
});

export default rootReducer;
