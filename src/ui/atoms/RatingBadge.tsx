import React from "react";

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, className }) => (
  <span className={`bg-primary/80 text-white text-sm px-2 py-1 rounded-md ${className || ""}`}>
    {rating}
  </span>
);
