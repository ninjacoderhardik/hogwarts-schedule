import React from "react";
import { useAppSelector } from "../../app/hooks";
import { findNextAvailableTeacher } from "../../utils/teacherUtils";
import { Card } from "../ui/Card";
import { SubjectBadge } from "./SubjectBadge";
import { TeacherCell } from "./TeacherCell";

export const CurrentSchedule: React.FC = () => {
  const { hierarchy, attendance } = useAppSelector((state) => state.teachers);
  const { allocations } = useAppSelector((state) => state.students);

  const getCurrentTeacher = (student: string): string => {
    const allocation = allocations[student];
    return findNextAvailableTeacher(
      hierarchy,
      attendance,
      allocation.teacher,
      allocation.subject
    );
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Current Schedule
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned Teacher
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(allocations).map(([student, allocation]) => (
              <tr
                key={student}
                className="hover:bg-gray-50"
                role="row"
                data-testid={`student-row-${student
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <SubjectBadge subject={allocation.subject} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <TeacherCell teacherName={getCurrentTeacher(student)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
