import teacherReducer, {
  updateAttendance,
} from "../../features/teachers/teacherSlice";
import { TeacherState } from "../../features/teachers/types";

describe("teacherSlice", () => {
  let initialState: TeacherState;

  beforeEach(() => {
    initialState = {
      hierarchy: {
        "Professor Dumbledore": {
          role: "Headmaster",
          children: ["Minerva McGonagall"],
        },
      },
      attendance: {
        "Professor Dumbledore": "Present",
      },
    };
  });

  it("should handle initial state", () => {
    expect(teacherReducer(undefined, { type: "unknown" })).toEqual(
      expect.objectContaining({
        attendance: expect.any(Object),
        hierarchy: expect.any(Object),
      })
    );
  });

  it("should handle updateAttendance", () => {
    const actual = teacherReducer(
      initialState,
      updateAttendance({ teacher: "Professor Dumbledore", status: "Absent" })
    );
    expect(actual.attendance["Professor Dumbledore"]).toEqual("Absent");
  });
});
