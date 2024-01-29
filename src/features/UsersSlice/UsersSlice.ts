import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UsersService from "../../api/service/user.service";

export type User = {
  id: string;
  email: string;
  tg_id: null;
  name: string;
  password: null;
  avatar: null;
  created_at: Date;
  role: string;
  subscription: {
    id: string;
    plan_id: string;
    user_id: string;
    tokens: number;
    additional_tokens: number;
    created_at: Date;
    plan: {
      id: string;
      type: string;
      price: number;
      currency: string;
      tokens: number;
    };
  };
};

export interface initialStateTypes {
  loading: boolean;
  users: User[];
  pages: number;
  activePage: number;
  orderBy: "asc" | "desc" | undefined;
  search: string;
  activeUser: {
    id?: string;
    email?: string;
  };
}

const initialState: initialStateTypes = {
  loading: false,
  users: [],
  pages: 1,
  activePage: 1,
  orderBy: undefined,
  search: '',
  activeUser: {},
};

export const getUsers = createAsyncThunk(
  "userSlice/getUsers",
  async ({ page }: { page?: number }, { getState }) => {
    try {
      const { usersSlice }: any = getState();
      const { orderBy, activePage, search } = usersSlice;

      let query = `?page=${page || activePage}`;
      if (orderBy) query += `&orderBy=tokens%3A${orderBy}`;
      if (search) query += `&search=${search}`;

      const res = await UsersService.getUsers(query);
      return res.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }
);

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      console.warn(action?.error);
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      state.pages = action.payload.pages;
    });
  },
});

export const { setActivePage, setOrderBy, setSearch, setActiveUser } =
  usersSlice.actions;

export default usersSlice.reducer;
