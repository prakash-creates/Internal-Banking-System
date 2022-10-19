import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("user", async (userObj, thunkApi) => {
    let res = await axios.post("http://localhost:8080/api/auth/login", userObj);
    let data = res.data;
    if (data.message === "success") {
        localStorage.setItem("token", data.token);
        return data.userObj;
    }
    if (
        data.message === "invalid useremail" ||
        data.message === "invalid password"
    ){
        return thunkApi.rejectWithValue(data);
    }
});


let userSlice = createSlice({
    name: "user",
    initialState: {
        userObj: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        errMsg: "",
    },
    reducers: {
        clearLoginStatus: (state) => {
            state.isSuccess = false;
            state.userObj = null;
            state.isError = false;
            state.errMsg = "";
        },
    },
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            state.isLoading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.errMsg = "";
        },
        [userLogin.rejected]: (state, action) => {
            state.isError = true;
            state.errMsg = action.payload.message;
        },
    },
});

export const { clearLoginStatus } = userSlice.actions;
export default userSlice.reducer;
