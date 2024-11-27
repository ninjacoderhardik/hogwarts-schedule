import React from "react";
import { render, screen } from "@testing-library/react";
import { Layout } from "../../../components/Layout/Layout";

describe("Layout", () => {
  it("renders children and header", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText("Schedule Today")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
