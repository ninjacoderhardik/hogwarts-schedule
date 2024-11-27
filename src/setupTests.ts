import "@testing-library/jest-dom";

// Add custom matchers if needed
expect.extend({
  toHaveClass(received, ...expected) {
    const pass = expected.every((className: string) =>
      received.classList.contains(className)
    );
    return {
      message: () =>
        `expected ${received} ${
          pass ? "not " : ""
        }to have classes ${expected.join(", ")}`,
      pass,
    };
  },
});
