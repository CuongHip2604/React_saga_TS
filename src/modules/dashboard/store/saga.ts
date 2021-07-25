import cityApi from "api/cityApi";
import studentApi from "api/studentApi";
import { City, ListResponse, Params, Student } from "models";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, RankingByCity } from "./slice";

function* handleGetDashboard() {
   try {
      yield all([
         call(getStatistics),
         call(getHighestStudents),
         call(getLowestStudents),
         call(getRankingByCity),
      ]);

      yield put(dashboardActions.GET_DASHBOARD_SUCCESS())
      
   } catch (error) {
      yield put(dashboardActions.GET_DASHBOARD_FAILED())
   }
}

function* getStatistics() {
   const params: Params = {
      _limit: 5,
      _page: 1,
   }
   const response: Array<ListResponse<Student>> = yield all([
      call(studentApi.getStudents, {...params, gender: "male"}),
      call(studentApi.getStudents, {...params, gender: "female"}),
      call(studentApi.getStudents, {...params, mark_gte: 8}),
      call(studentApi.getStudents, {...params, mark_lte: 5}),
   ])

   const [maleCount, femaleCount, highMarkCount, lowMarkCount] = response.map(x => x.pagination._totalRows)
   yield put(dashboardActions.SET_STATISTICS({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount
   }))
}
function* getHighestStudents() {
   const params: Params = {
      _limit: 5,
      _page: 1,
      _sort: "mark",
      _order: 'desc'
   }
   const { data }: ListResponse<Student> = yield call(studentApi.getStudents, params)
   yield put(dashboardActions.SET_HIGHEST_STUDENTS(data))
}
function* getLowestStudents() {
   const params: Params = {
      _limit: 5,
      _page: 1,
      _sort: "mark",
      _order: 'asc'
   }
   const { data }: ListResponse<Student> = yield call(studentApi.getStudents, params)
   yield put(dashboardActions.SET_LOWEST_STUDENTS(data))
}
function* getRankingByCity() {
   // get cities
   const { data: cities }: ListResponse<City> = yield call(cityApi.getAll, {
      _limit: 10,
      _page: 1,
   })

   // ranking by city
   const calls = cities.map(x => call(studentApi.getStudents, {
      _limit: 5,
      _page: 1,
      _sort: "mark",
      _order: 'desc',
      city: x.code
   }))


   const res: Array<ListResponse<Student>> = yield all(calls)
   const rankingByCity: RankingByCity[] = res.map((x, index) => ({
      cityId: cities[index].code,
      rankings: x.data,
      cityName: cities[index].name
   }))

   // update state
   yield put(dashboardActions.SET_RANKING_BY_CITY(rankingByCity))
}

export default function* dashboardSaga() {
   yield takeLatest(dashboardActions.GET_DASHBOARD.type, handleGetDashboard)
}