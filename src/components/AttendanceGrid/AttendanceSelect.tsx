import React from "react";
import { AttendanceStatus } from "../../types";

interface AttendanceSelectProps {
  teacher?: string;
  value: AttendanceStatus;
  onChange: (status: AttendanceStatus) => void;
}

export const AttendanceSelect: React.FC<AttendanceSelectProps> = ({
  teacher,
  value,
  onChange,
}) => {
  return (
    <select
      role="combobox"
      data-testid={`attendance-select-${teacher
        ?.replace(/\s+/g, "-")
        .toLowerCase()}`}
      aria-label={`Set attendance for ${teacher}`}
      value={value}
      onChange={(e) => onChange(e.target.value as AttendanceStatus)}
      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
    </select>
  );
};
