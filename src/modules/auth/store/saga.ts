import { authActions, LoginPayload } from "./slice";
import { call, fork, take } from "redux-saga/effects"
import { PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "shared/plugins/constants";
import history from "router/history";

function* handleLogin(payload: LoginPayload) {
   yield localStorage.setItem(ACCESS_TOKEN, "fake token")
   history.push("/")
}

function* handleLogout() {
   yield localStorage.removeItem(ACCESS_TOKEN)
   // redirect to login page
   history.push("/login")
}

function* watchLoginFlow() {
   while (true) {
      
      const isLoggedIn = Boolean(localStorage.getItem(ACCESS_TOKEN))

      if (!isLoggedIn) {
         const action: PayloadAction<LoginPayload> = yield take(authActions.LOGIN.type)
         yield fork(handleLogin, action.payload)
      }
   
      yield take(authActions.LOGOUT.type)
      yield call(handleLogout)
   }
}

export default function* authSaga() {
   yield fork(watchLoginFlow)
}