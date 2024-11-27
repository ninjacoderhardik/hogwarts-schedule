export type AttendanceStatus = "Present" | "Absent";
export type Subject = "Potions Master" | "Defense Against the Dark Arts";
export type Role =
  | "Headmaster"
  | "Headmistress"
  | "Standby Professor"
  | "Professor";

export interface TeacherDetails {
  role: Role;
  subject?: Subject;
  children: string[];
}

export interface TeacherHierarchy {
  [key: string]: TeacherDetails;
}

export interface TeacherAttendance {
  [key: string]: AttendanceStatus;
}

export interface TeacherState {
  hierarchy: TeacherHierarchy;
  attendance: Record<string, AttendanceStatus>;
}

export interface StudentAllocation {
  subject: Subject;
  teacher: string | null;
}

export interface StudentAllocations {
  [key: string]: StudentAllocation;
}

export interface StudentState {
  allocations: StudentAllocations;
}

export interface RootState {
  teachers: TeacherState;
  students: StudentState;
}
