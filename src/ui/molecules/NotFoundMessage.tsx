import React from "react";

interface NotFoundMessageProps {
  title?: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

export const NotFoundMessage: React.FC<NotFoundMessageProps> = ({ title = "404", subtitle = "Oops! Page not found", linkText = "Return to Home", linkHref = "/" }) => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-xl text-gray-600 mb-4">{subtitle}</p>
    <a href={linkHref} className="text-blue-500 hover:text-blue-700 underline">
      {linkText}
    </a>
  </div>
);
