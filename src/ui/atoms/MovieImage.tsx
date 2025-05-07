import React from "react";

interface MovieImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const MovieImage: React.FC<MovieImageProps> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={`h-full w-full object-cover object-top transition-transform duration-300 hover:scale-110 ${className || ""}`}
  />
);
