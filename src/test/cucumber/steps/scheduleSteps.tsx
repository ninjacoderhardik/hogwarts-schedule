import { Given, When, Then } from "@cucumber/cucumber";
import { fireEvent, within } from "@testing-library/react";
import { expect } from "chai";
import { createTestStore } from "../../testUtils";
import { CustomWorld } from "../support/world";
import { StudentState } from "../../../types";

interface StudentRow {
  Student: string;
  Subject: string;
  Teacher?: string;
}

let currentWorld: CustomWorld;

Given(
  "the following teacher hierarchy exists:",
  async function (this: CustomWorld, dataTable) {
    currentWorld = this;
    const hierarchyData = dataTable.hashes();
    const hierarchy = hierarchyData.reduce((acc: any, row: any) => {
      acc[row.Teacher] = {
        role: row.Role,
        subject: row.Subject || undefined,
        children: [],
      };
      return acc;
    }, {});

    hierarchyData.forEach((row: any) => {
      if (row["Reports To"]) {
        hierarchy[row["Reports To"]].children.push(row.Teacher);
      }
    });

    this.testStore = createTestStore({
      teachers: {
        hierarchy,
        attendance: {},
      },
    });

    // Initialize rendering after store setup
    await this.initializeTest();
  }
);

Given(
  "the following student allocations exist:",
  async function (this: CustomWorld, dataTable) {
    if (!this.testStore) {
      throw new Error("Store must be initialized first");
    }

    const allocations = (dataTable.hashes() as StudentRow[]).reduce(
      (acc, row) => {
        acc[row.Student] = {
          subject: row.Subject,
          teacher: row.Teacher || null,
        };
        return acc;
      },
      {} as Record<string, { subject: string; teacher: string | null }>
    );

    const currentState = this.testStore?.getState();
    if (!currentState) throw new Error("Store not initialized");

    this.testStore = createTestStore({
      teachers: currentState.teachers,
      students: { allocations } as StudentState,
    });

    // Re-render with new store state
    await this.initializeTest();
  }
);

Given("all teachers are initially present", async function (this: CustomWorld) {
  if (!this.testStore) throw new Error("Store not initialized");

  const attendance = Object.keys(
    this.testStore.getState().teachers.hierarchy
  ).reduce<Record<string, "Present" | "Absent">>((acc, teacher) => {
    acc[teacher] = "Present";
    return acc;
  }, {});

  this.testStore.dispatch({
    type: "teachers/setAllAttendance",
    payload: attendance,
  });

  // Re-render with new store state
  await this.initializeTest();
});

When("I view the current schedule", async function (this: CustomWorld) {
  await this.initializeTest();
  await this.verifyRendered();
});

When(
  "{string} is marked as {string}",
  async function (this: CustomWorld, teacher: string, status: string) {
    if (!this.container) {
      throw new Error("Component not rendered");
    }

    // Find the select element using the data-testid
    const selectId = `attendance-select-${teacher
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    const select = within(this.container).getByTestId(selectId);

    if (!select) {
      throw new Error(
        `Could not find attendance select for teacher: ${teacher}`
      );
    }

    fireEvent.change(select, { target: { value: status } });

    // Wait for state updates
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
);

When(
  "the following teachers are marked as absent:",
  async function (this: CustomWorld, dataTable) {
    if (!this.container) {
      throw new Error("Component not rendered");
    }

    for (const row of dataTable.hashes()) {
      const teacher = row.Teacher;
      const selectId = `attendance-select-${teacher
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      const select = within(this.container).getByTestId(selectId);

      if (!select) {
        throw new Error(
          `Could not find attendance select for teacher: ${teacher}`
        );
      }

      fireEvent.change(select, { target: { value: "Absent" } });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
);

Then(
  "{string} should be assigned to {string}",
  async function (this: CustomWorld, student: string, teacher: string) {
    await this.verifyRendered();

    try {
      // Find the student row first
      const studentId = `student-row-${student
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      const studentRow = this.container?.querySelector(
        `[data-testid="${studentId}"]`
      );

      if (!studentRow) {
        console.error(
          "Available rows:",
          Array.from(
            this.container?.querySelectorAll('[data-testid^="student-row-"]') ||
              []
          ).map((el) => ({
            id: el.getAttribute("data-testid"),
            content: el.textContent,
          }))
        );
        throw new Error(`Could not find row for student: ${student}`);
      }

      // Find the teacher cell within that row
      const teacherCell = studentRow.querySelector(
        '[data-testid="teacher-cell"]'
      );

      if (!teacherCell) {
        console.error("Row content:", studentRow.innerHTML);
        throw new Error(`Could not find teacher cell for student: ${student}`);
      }

      expect(teacherCell.textContent?.trim()).to.equal(teacher);
    } catch (error) {
      console.log(`Error checking assignment for ${student}`);
      throw error;
    }
  }
);

Then(
  "{string} should still be assigned to {string}",
  async function (this: CustomWorld, student: string, teacher: string) {
    // Reuse the existing assignment check logic
    await this.verifyRendered();

    try {
      const studentId = `student-row-${student
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      const studentRow = this.container?.querySelector(
        `[data-testid="${studentId}"]`
      );

      if (!studentRow) {
        console.error(
          "Available rows:",
          Array.from(
            this.container?.querySelectorAll('[data-testid^="student-row-"]') ||
              []
          ).map((el) => ({
            id: el.getAttribute("data-testid"),
            content: el.textContent,
          }))
        );
        throw new Error(`Could not find row for student: ${student}`);
      }

      const teacherCell = studentRow.querySelector(
        '[data-testid="teacher-cell"]'
      );

      if (!teacherCell) {
        throw new Error(`Could not find teacher cell for student: ${student}`);
      }

      expect(teacherCell.textContent?.trim()).to.equal(teacher);
    } catch (error) {
      console.log(`Error checking assignment for ${student}`);
      throw error;
    }
  }
);

Then(
  "all students should be assigned to {string}",
  async function (this: CustomWorld, teacher: string) {
    await this.verifyRendered();

    try {
      const teacherCells = this.container?.querySelectorAll(
        '[data-testid="teacher-cell"]'
      );

      if (!teacherCells || teacherCells.length === 0) {
        throw new Error("No teacher cells found");
      }

      teacherCells.forEach((cell) => {
        expect(cell.textContent?.trim()).to.equal(teacher);
      });
    } catch (error) {
      console.error("Error checking all assignments:", error);
      throw error;
    }
  }
);

When(
  "all teachers are marked as {string}",
  async function (this: CustomWorld, status: string) {
    if (!this.container) {
      throw new Error("Component not rendered");
    }

    const selects = this.container.querySelectorAll(
      'select[data-testid^="attendance-select-"]'
    );

    if (!selects || selects.length === 0) {
      throw new Error("No attendance selects found");
    }

    // Change all selects to the specified status
    for (const select of Array.from(selects)) {
      fireEvent.change(select, { target: { value: status } });
      // Wait a bit between each change to allow for state updates
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Final wait for all updates to complete
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
);

Then(
  "all students should be marked as {string}",
  async function (this: CustomWorld, status: string) {
    await this.verifyRendered();

    try {
      const teacherCells = this.container?.querySelectorAll(
        '[data-testid="teacher-cell"]'
      );

      if (!teacherCells || teacherCells.length === 0) {
        throw new Error("No teacher cells found");
      }

      teacherCells.forEach((cell) => {
        expect(cell.textContent?.trim()).to.equal(status);
      });
    } catch (error) {
      console.error("Error checking all assignments:", error);
      throw error;
    }
  }
);
