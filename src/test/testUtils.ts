import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from '../features/teachers/teacherSlice';
import studentReducer from '../features/students/studentSlice';
import { TeacherState, StudentState } from '../types';

interface PreloadedState {
  teachers?: Partial<TeacherState>;
  students?: Partial<StudentState>;
}

export const createTestStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: {
      teachers: teacherReducer,
      students: studentReducer
    },
    preloadedState: {
      teachers: {
        hierarchy: {},
        attendance: {},
        ...(preloadedState?.teachers || {})
      } as TeacherState,
      students: {
        allocations: {},
        ...(preloadedState?.students || {})
      } as StudentState
    }
  });
};
