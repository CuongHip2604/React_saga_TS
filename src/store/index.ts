import { configureStore, ThunkAction, Action, createSlice } from '@reduxjs/toolkit';
import createSageMiddleware from "redux-saga"
import sagas from "shared/sagas"
import authReducers from 'modules/auth/store/slice';
import dashboardReducers from 'modules/dashboard/store/slice';
import studentReducers from 'modules/students/store/slice';

const sageMiddleware = createSageMiddleware()


export interface State {
  sidebarShow: boolean;
}

const initialState: State = {
  sidebarShow: true,
};

const { actions, reducer } = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    }
  },
});

export const { setSidebarShow } = actions;

export const store = configureStore({
  reducer: {
    root: reducer,
    auth: authReducers,
    dashboard: dashboardReducers,
    student: studentReducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sageMiddleware)
});

sageMiddleware.run(sagas)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
