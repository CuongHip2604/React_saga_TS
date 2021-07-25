import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponse, PaginationParams, Params, Student } from "models";
import { GET_STUDENTS, GET_STUDENTS_FAILED, GET_STUDENTS_SUCCESS, SET_FILTERS } from "./action-types";

export interface StudentState {
   loading: boolean;
   students: Student[];
   filters: Params;
   pagination: PaginationParams;
}

const initialState: StudentState = {
   loading: false,
   students: [],
   filters: {
      _page: 1,
      _limit: 10,
   },
   pagination: {
      _page: 1,
      _limit: 10,
      _totalRows: 10
   }
}

const studentSlice = createSlice({
   name: "student",
   initialState,
   reducers: {
      [GET_STUDENTS]: (state, actions: PayloadAction<Params>) => {
         state.loading = true
      },
      [GET_STUDENTS_SUCCESS]: (state, actions: PayloadAction<ListResponse<Student>>) => {
         state.students = actions.payload.data
         state.pagination = actions.payload.pagination
         state.loading = false
      },
      [GET_STUDENTS_FAILED]: (state) => {
         state.loading = false
      },
      [SET_FILTERS]: (state, actions: PayloadAction<Params>) => {
         state.filters = actions.payload
      },
   }
})

// Actions
export const studentActions = studentSlice.actions

// Reducers
const studentReducers = studentSlice.reducer
export default studentReducers