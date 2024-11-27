import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherState, UpdateAttendancePayload } from "./types";
import { TeacherAttendance } from "../../types";

const initialState: TeacherState = {
  hierarchy: {
    "Professor Dumbledore": {
      role: "Headmaster",
      children: ["Minerva McGonagall"],
    },
    "Minerva McGonagall": {
      role: "Headmistress",
      children: ["Rubeus Hagrid", "Alastor Moody"],
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
    "Alastor Moody": {
      role: "Standby Professor",
      subject: "Defense Against the Dark Arts",
      children: ["Remus Lupin", "Gilderoy Lockhart"],
    },
  },
  attendance: {
    "Professor Dumbledore": "Present",
    "Minerva McGonagall": "Present",
    "Rubeus Hagrid": "Present",
    "Horace Slughorn": "Present",
    "Severus Snape": "Present",
    "Alastor Moody": "Present",
  },
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    updateAttendance: (
      state,
      action: PayloadAction<UpdateAttendancePayload>
    ) => {
      const { teacher, status } = action.payload;
      state.attendance[teacher] = status;
    },
    setAllAttendance: (state, action: PayloadAction<TeacherAttendance>) => {
      state.attendance = action.payload;
    },
  },
});

export const { updateAttendance, setAllAttendance } = teacherSlice.actions;
export default teacherSlice.reducer;
