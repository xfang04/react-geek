import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";
import { loginApi, getUserInfoApi } from "@/apis/user";
const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法封装，获取登陆token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginApi(loginForm);
    dispatch(setToken(res.data.token));
  };
};

// 异步方法封装，获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfoApi();
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
