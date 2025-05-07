import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, buttonText, onButtonClick }) => (
  <div className="text-center py-10">
    <h3 className="text-xl text-gray-400 mb-4">{title}</h3>
    <Button onClick={onButtonClick}>{buttonText}</Button>
  </div>
);
