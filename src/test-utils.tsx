import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import teacherReducer from "./features/teachers/teacherSlice";
import studentReducer from "./features/students/studentSlice";
import { RootState } from "./app/store";

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        teachers: teacherReducer as any,
        students: studentReducer as any,
      },
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof configureStore>;
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
