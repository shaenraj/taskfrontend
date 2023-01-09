import apiClient from "./../../api/index";
import { userURL } from "./../../api/URL";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";

interface UserState {
  users: User[] | null;
  total: number;
  loading: boolean;
  errors: any;
}

const initialState: UserState = {
  users: [],
  total: 1,
  loading: false,
  errors: null,
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (params: { page: number; size: number; sortQuery: string }) => {
    const response = await apiClient.get(
      `${userURL.getUsers}?page=${params.page}&size=${params.size}&sort=${params.sortQuery}`
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.items;
      state.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error.message;
    });
  },
});

export default userSlice.reducer;
