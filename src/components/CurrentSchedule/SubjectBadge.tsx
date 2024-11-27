import React from "react";
import { Subject } from "../../types";

interface SubjectBadgeProps {
  subject: Subject;
}

export const SubjectBadge: React.FC<SubjectBadgeProps> = ({ subject }) => {
  const getColorClass = (subject: Subject): string => {
    switch (subject) {
      case "Potions Master":
        return "bg-purple-100 text-purple-800";
      case "Defense Against the Dark Arts":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorClass(
        subject
      )}`}
    >
      {subject}
    </span>
  );
};
