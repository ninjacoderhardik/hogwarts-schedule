import "./dom.setup"; // Must be first import
import { setWorldConstructor } from "@cucumber/cucumber";
import {
  fireEvent,
  render,
  RenderResult,
  within,
} from "@testing-library/react";
import { Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React from "react";
import App from "../../../App";

export class CustomWorld {
  testStore?: Store;
  rendered?: RenderResult;
  container?: HTMLElement;

  constructor() {
    this.testStore = undefined;
    this.rendered = undefined;
    this.container = undefined;
  }

  async initializeTest() {
    if (!this.testStore) {
      throw new Error("Store must be initialized before rendering");
    }

    // Clean up previous render
    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container);
    }

    // Create fresh container
    this.container = document.createElement("div");
    document.body.appendChild(this.container);

    // Render app
    this.rendered = render(
      <Provider store={this.testStore}>
        <App />
      </Provider>,
      { container: this.container }
    );

    // Wait for render and effects
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // async renderApp(component: React.ReactElement): Promise<void> {
  //   if (!this.testStore) {
  //     throw new Error("Store must be initialized before rendering");
  //   }

  //   // Clean up previous render
  //   if (this.container) {
  //     document.body.removeChild(this.container);
  //   }

  //   // Create fresh container
  //   this.container = document.createElement("div");
  //   document.body.appendChild(this.container);

  //   this.rendered = render(
  //     <Provider store={this.testStore}>{component}</Provider>,
  //     { container: this.container }
  //   );

  //   // Wait for effects
  //   await new Promise((resolve) => setTimeout(resolve, 100));
  // }

  async verifyRendered() {
    if (!this.rendered || !this.container) {
      await this.initializeTest();
    }
  }

  async findTeacherSelect(teacher: string): Promise<HTMLSelectElement> {
    await this.verifyRendered();
    if (!this.container) throw new Error("this.container error");

    const selectId = `attendance-select-${teacher
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    const select = within(this.container).getByTestId(selectId);

    if (!select) {
      throw new Error(`Could not find select for teacher: ${teacher}`);
    }

    return select as HTMLSelectElement;
  }

  async setTeacherAttendance(teacher: string, status: string): Promise<void> {
    await this.verifyRendered();

    const selectId = `attendance-select-${teacher
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    const select = this.container!.querySelector(
      `[data-testid="${selectId}"]`
    ) as HTMLSelectElement;

    if (!select) {
      console.error("Available elements:", this.container!.innerHTML);
      throw new Error(
        `Could not find attendance select for teacher: ${teacher}`
      );
    }

    fireEvent.change(select, { target: { value: status } });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

setWorldConstructor(CustomWorld);
