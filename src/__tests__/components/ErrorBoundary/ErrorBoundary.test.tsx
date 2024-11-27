import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../../../components/ErrorBoundary/ErrorBoundary";

const ErrorComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it("renders error message when error occurs", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("provides refresh button", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Refresh Page")).toBeInTheDocument();
  });
});
