import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "../features/teachers/teacherSlice";
import studentReducer from "../features/students/studentSlice";

export const store = configureStore({
  reducer: {
    teachers: teacherReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
