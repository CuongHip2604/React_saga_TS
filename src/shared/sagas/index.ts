import authSaga from "modules/auth/store/saga";
import dashboardSaga from "modules/dashboard/store/saga";
import studentSaga from "modules/students/store/saga";
import { all } from "redux-saga/effects";

export default function* sagas () {
   yield all([authSaga(), dashboardSaga(),studentSaga()]);
}