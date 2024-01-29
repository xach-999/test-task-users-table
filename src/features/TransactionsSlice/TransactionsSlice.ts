import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TransactionsService from "../../api/service/transactions.service";

export interface UserserTransactions {
  id: string;
  provider: string;
  amount: number;
  currency: string;
  meta: null;
  status: string;
  type: string;
  plan_id: null;
  user_id: string;
  referral_id: null;
  created_at: Date;
  external_id: null;
}

export interface initialStateTypes {
  userTransactions: UserserTransactions[];
}

const initialState: initialStateTypes = {
  userTransactions: [],
};

export const getUserTransactions = createAsyncThunk(
  "transactionsSlice/getUserTransactions",
  async (id: string) => {
    try {
      const res = await TransactionsService.getUserTransactions(id);
      return res.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }
);

export const transactionsSlice = createSlice({
  name: "transactionsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserTransactions.fulfilled, (state, action) => {
      state.userTransactions = action.payload;
    });
  },
});

export default transactionsSlice.reducer;
