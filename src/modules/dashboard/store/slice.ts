import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "models";
import { GET_DASHBOARD, GET_DASHBOARD_FAILED, GET_DASHBOARD_SUCCESS, SET_HIGHEST_STUDENTS, SET_LOWEST_STUDENTS, SET_RANKING_BY_CITY, SET_STATISTICS } from "./action-types";

export interface DashboardStatistics {
   maleCount: number;
   femaleCount: number;
   highMarkCount: number;
   lowMarkCount: number;
}

export interface RankingByCity {
   cityId: string;
   rankings: Student[];
   cityName: string;
}

export interface DashboardState {
   loading: boolean;
   statistics: DashboardStatistics;
   highestStudents: Student[];
   lowestStudents: Student[];
   rankingByCity: RankingByCity[];
}

const initialState: DashboardState = {
   loading: false,
   statistics: {
      maleCount: 0,
      femaleCount: 0,
      highMarkCount: 0,
      lowMarkCount: 0
   },
   highestStudents: [],
   lowestStudents: [],
   rankingByCity: []
}

const dashboardSlice = createSlice({
   name: "dashboard",
   initialState,
   reducers: {
      [GET_DASHBOARD]: (state) => {
         state.loading = true
      },
      [GET_DASHBOARD_SUCCESS]: (state) => {
         state.loading = false
      },
      [GET_DASHBOARD_FAILED]: (state) => {
         state.loading = false
      },
      [SET_STATISTICS]: (state, actions: PayloadAction<DashboardStatistics>) => {
         state.statistics = actions.payload
      },
      [SET_HIGHEST_STUDENTS]: (state, actions: PayloadAction<Student[]>) => {
         state.highestStudents = actions.payload
      },
      [SET_LOWEST_STUDENTS]: (state, actions: PayloadAction<Student[]>) => {
         state.lowestStudents = actions.payload
      },
      [SET_RANKING_BY_CITY]: (state, actions: PayloadAction<RankingByCity[]>) => {
         state.rankingByCity = actions.payload
      },
   }
})

// Actions
export const dashboardActions = dashboardSlice.actions

// Reducers
const dashboardReducers = dashboardSlice.reducer
export default dashboardReducers