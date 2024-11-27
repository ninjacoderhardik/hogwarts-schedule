import React from "react";
import { render, screen } from "@testing-library/react";
import { TeacherCell } from "../../../components/CurrentSchedule/TeacherCell";

describe("TeacherCell", () => {
  it("renders assigned teacher with correct styling", () => {
    render(<TeacherCell teacherName="Severus Snape" />);
    const cell = screen.getByText("Severus Snape");
    expect(cell).toHaveClass("bg-green-100", "text-green-800");
  });

  it("renders Not Assigned with correct styling", () => {
    render(<TeacherCell teacherName="Not Assigned" />);
    const cell = screen.getByText("Not Assigned");
    expect(cell).toHaveClass("bg-red-100", "text-red-800");
  });
});
