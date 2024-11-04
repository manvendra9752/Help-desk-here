import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  isAuthenticated: false,
  name: "",
  token: "",
  userid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole(state, action) {
      state.role = action.payload.user.role;
      state.name = action.payload.user.name;
      state.userid = action.payload.user.id;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logoutUser(state) {
      state.userRole = null;
      state.isAuthenticated = false;
      state.userName = "";
      state.token = "";
      state.userid = "";
    },
  },
});

export const { setUserRole, logoutUser } = userSlice.actions;
export default userSlice.reducer;
