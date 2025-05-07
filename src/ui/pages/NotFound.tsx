import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NotFoundMessage } from "../molecules/NotFoundMessage";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <NotFoundMessage />
    </div>
  );
};

export default NotFound;