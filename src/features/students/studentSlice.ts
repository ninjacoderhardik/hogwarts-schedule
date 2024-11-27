import { createSlice } from "@reduxjs/toolkit";
import { StudentState } from "./types";

const initialState: StudentState = {
  allocations: {
    "Harry Potter": { subject: "Potions Master", teacher: "Horace Slughorn" },
    "Hermione Granger": { subject: "Potions Master", teacher: null },
    "Ron Weasley": { subject: "Potions Master", teacher: "Severus Snape" },
    "Draco Malfoy": { subject: "Potions Master", teacher: "Horace Slughorn" },
    "Padma Patil": { subject: "Potions Master", teacher: null },
    "Luna Lovegood": { subject: "Potions Master", teacher: "Severus Snape" },
  },
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
});

export default studentSlice.reducer;
