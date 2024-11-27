import { TeacherHierarchy, TeacherAttendance, AttendanceStatus } from '../../types';

export interface TeacherState {
  hierarchy: TeacherHierarchy;
  attendance: TeacherAttendance;
}

export interface UpdateAttendancePayload {
  teacher: string;
  status: AttendanceStatus;
}