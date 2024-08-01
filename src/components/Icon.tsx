import React from "react";

interface IconProps {
  name: "attachment" | "send";
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case "attachment":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${className}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 11-2.828-2.828l6.586-6.586a2 2 0 112.828 2.828z"
          />
        </svg>
      );
    case "send":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${className}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
