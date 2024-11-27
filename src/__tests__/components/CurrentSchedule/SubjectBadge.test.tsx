import React from "react";
import { render, screen } from "@testing-library/react";
import { SubjectBadge } from "../../../components/CurrentSchedule/SubjectBadge";

describe("SubjectBadge", () => {
  it("renders Potions Master with correct styling", () => {
    render(<SubjectBadge subject="Potions Master" />);
    const badge = screen.getByText("Potions Master");
    expect(badge).toHaveClass("bg-purple-100", "text-purple-800");
  });

  it("renders Defense Against the Dark Arts with correct styling", () => {
    render(<SubjectBadge subject="Defense Against the Dark Arts" />);
    const badge = screen.getByText("Defense Against the Dark Arts");
    expect(badge).toHaveClass("bg-red-100", "text-red-800");
  });
});
