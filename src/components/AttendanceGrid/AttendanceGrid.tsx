import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateAttendance } from "../../features/teachers/teacherSlice";
import { AttendanceStatus } from "../../types";
import { AttendanceSelect } from "./AttendanceSelect";
import { Card } from "../ui/Card";

export const AttendanceGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { attendance } = useAppSelector((state) => state.teachers);

  const handleAttendanceChange = (
    teacher: string,
    status: AttendanceStatus
  ): void => {
    dispatch(updateAttendance({ teacher, status }));
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Teacher Attendance
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Teacher
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(attendance).map(([teacher, status]) => (
              <tr
                key={teacher}
                className="hover:bg-gray-50"
                data-testid={`teacher-row-${teacher
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {teacher}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <AttendanceSelect
                    teacher={teacher}
                    value={status}
                    onChange={(newStatus) =>
                      handleAttendanceChange(teacher, newStatus)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
