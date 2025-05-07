import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-8">
      <Link to='/' className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-transparent bg-clip-text">
        CotufaMovies
      </Link>
    </header>
  );
};

export default Header;
