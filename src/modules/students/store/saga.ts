import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListResponse, Params, Student } from "models";
import { call, put, takeEvery } from "redux-saga/effects";
import { studentActions } from "./slice";

function* getStudents(actions: PayloadAction<Params>) {
   try {
      const res: ListResponse<Student> = yield call(studentApi.getStudents, actions.payload)
      yield put(studentActions.GET_STUDENTS_SUCCESS(res))
      yield put(studentActions.SET_FILTERS(actions.payload))
   } catch (error) {
      yield put(studentActions.GET_STUDENTS_FAILED())
      
   }
}

export default function* studentSaga() {
   // watch student actions
   yield takeEvery(studentActions.GET_STUDENTS, getStudents)
}