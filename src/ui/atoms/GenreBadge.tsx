import React from "react";

interface GenreBadgeProps {
  genre: string;
  className?: string;
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({ genre, className }) => (
  <span className={`bg-secondary/30 text-xs px-2 py-1 rounded-md text-gray-300 ${className || ""}`}>
    {genre}
  </span>
);
