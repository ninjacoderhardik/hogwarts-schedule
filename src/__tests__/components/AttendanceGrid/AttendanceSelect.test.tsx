import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AttendanceSelect } from "../../../components/AttendanceGrid/AttendanceSelect";

describe("AttendanceSelect", () => {
  const mockOnChange = jest.fn();

  it("renders with initial value", () => {
    render(<AttendanceSelect value="Present" onChange={mockOnChange} />);
    expect(screen.getByRole("combobox")).toHaveValue("Present");
  });

  it("calls onChange when selection changes", () => {
    render(<AttendanceSelect value="Present" onChange={mockOnChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Absent" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("Absent");
  });
});
