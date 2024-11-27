import { findNextAvailableTeacher } from "../../utils/teacherUtils";
import { TeacherHierarchy, TeacherAttendance } from "../../types";

describe("findNextAvailableTeacher", () => {
  const mockHierarchy: TeacherHierarchy = {
    "Professor Dumbledore": {
      role: "Headmaster",
      children: ["Minerva McGonagall"],
    },
    "Minerva McGonagall": {
      role: "Headmistress",
      children: ["Rubeus Hagrid"],
    },
    "Rubeus Hagrid": {
      role: "Standby Professor",
      subject: "Potions Master",
      children: ["Horace Slughorn", "Severus Snape"],
    },
    "Horace Slughorn": {
      role: "Professor",
      subject: "Potions Master",
      children: [],
    },
    "Severus Snape": {
      role: "Professor",
      subject: "Potions Master",
      children: [],
    },
  };

  it("returns the current teacher if present", () => {
    const attendance: TeacherAttendance = {
      "Horace Slughorn": "Present",
    };

    expect(
      findNextAvailableTeacher(
        mockHierarchy,
        attendance,
        "Horace Slughorn",
        "Potions Master"
      )
    ).toBe("Horace Slughorn");
  });

  it("returns standby teacher if assigned teacher is absent", () => {
    const attendance: TeacherAttendance = {
      "Horace Slughorn": "Absent",
      "Rubeus Hagrid": "Present",
      "Severus Snape": "Absent",
    };

    expect(
      findNextAvailableTeacher(
        mockHierarchy,
        attendance,
        "Horace Slughorn",
        "Potions Master"
      )
    ).toBe("Rubeus Hagrid");
  });

  it("returns Minerva McGonagall if both assigned and standby teachers are absent", () => {
    const attendance: TeacherAttendance = {
      "Horace Slughorn": "Absent",
      "Rubeus Hagrid": "Absent",
      "Minerva McGonagall": "Present",
      "Professor Dumbledore": "Present",
    };

    expect(
      findNextAvailableTeacher(
        mockHierarchy,
        attendance,
        "Horace Slughorn",
        "Potions Master"
      )
    ).toBe("Minerva McGonagall");
  });

  it("returns Not Assigned if all teachers are absent", () => {
    const attendance: TeacherAttendance = {
      "Professor Dumbledore": "Absent",
      "Minerva McGonagall": "Absent",
      "Rubeus Hagrid": "Absent",
      "Horace Slughorn": "Absent",
      "Severus Snape": "Absent",
    };

    expect(
      findNextAvailableTeacher(
        mockHierarchy,
        attendance,
        "Horace Slughorn",
        "Potions Master"
      )
    ).toBe("Not Assigned");
  });
});
