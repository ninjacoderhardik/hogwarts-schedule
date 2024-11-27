import React from "react";

interface TeacherCellProps {
  teacherName: string;
}

export const TeacherCell: React.FC<TeacherCellProps> = ({ teacherName }) => {
  const isNotAssigned = teacherName === "Not Assigned";

  return (
    <span
      data-testid="teacher-cell"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium
      ${
        isNotAssigned
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {teacherName}
    </span>
  );
};
