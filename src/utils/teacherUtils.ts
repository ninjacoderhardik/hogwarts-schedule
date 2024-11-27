import { TeacherHierarchy, TeacherAttendance, Subject } from "../types";

const getTeacherHierarchyChain = (
  hierarchy: TeacherHierarchy,
  subject: Subject
): string[] => {
  // First, find subject-specific teachers
  const subjectTeachers = Object.entries(hierarchy)
    .filter(([_, details]) => details.subject === subject)
    .sort((a, b) => {
      // Standby professors should be first in the chain
      if (a[1].role === "Standby Professor") return -1;
      if (b[1].role === "Standby Professor") return 1;
      return 0;
    })
    .map(([name]) => name);

  // Then add the general hierarchy (Headmistress, Headmaster)
  return [...subjectTeachers, "Minerva McGonagall", "Professor Dumbledore"];
};

export const findNextAvailableTeacher = (
  hierarchy: TeacherHierarchy,
  attendance: TeacherAttendance,
  currentTeacher: string | null,
  subject: Subject
): string => {
  // If there's a current teacher and they're present, return them
  if (currentTeacher && attendance[currentTeacher] === "Present") {
    return currentTeacher;
  }

  // Get the hierarchical chain of teachers for this subject
  const teacherChain = getTeacherHierarchyChain(hierarchy, subject);

  // Find the first available teacher in the chain
  const availableTeacher = teacherChain.find(
    (teacher) => attendance[teacher] === "Present"
  );

  return availableTeacher || "Not Assigned";
};
