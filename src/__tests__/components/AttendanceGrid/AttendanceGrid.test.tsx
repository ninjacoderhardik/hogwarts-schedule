import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AttendanceGrid } from "../../../components/AttendanceGrid/AttendanceGrid";
import teacherReducer from "../../../features/teachers/teacherSlice";

describe("AttendanceGrid", () => {
  const renderWithRedux = (component: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        teachers: teacherReducer,
      },
    });
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("renders the attendance grid with teachers", () => {
    renderWithRedux(<AttendanceGrid />);
    expect(screen.getByText("Teacher Attendance")).toBeInTheDocument();
    expect(screen.getByText("Professor Dumbledore")).toBeInTheDocument();
  });

  it("allows changing teacher attendance status", () => {
    renderWithRedux(<AttendanceGrid />);
    const select = screen.getAllByRole("combobox")[0];
    fireEvent.change(select, { target: { value: "Absent" } });
    expect(select).toHaveValue("Absent");
  });

  it("displays all required columns", () => {
    renderWithRedux(<AttendanceGrid />);
    expect(screen.getByText("Teacher")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
