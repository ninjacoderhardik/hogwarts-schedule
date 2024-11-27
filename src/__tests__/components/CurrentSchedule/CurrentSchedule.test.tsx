import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CurrentSchedule } from "../../../components/CurrentSchedule/CurrentSchedule";
import teacherReducer from "../../../features/teachers/teacherSlice";
import studentReducer from "../../../features/students/studentSlice";

describe("CurrentSchedule", () => {
  const renderWithRedux = (component: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        teachers: teacherReducer,
        students: studentReducer,
      },
    });
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("renders the current schedule with students", () => {
    renderWithRedux(<CurrentSchedule />);
    expect(screen.getByText("Current Schedule")).toBeInTheDocument();
    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
  });

  it("displays all required columns", () => {
    renderWithRedux(<CurrentSchedule />);
    expect(screen.getByText("Student")).toBeInTheDocument();
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Assigned Teacher")).toBeInTheDocument();
  });
});
