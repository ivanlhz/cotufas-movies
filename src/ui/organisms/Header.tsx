import { Link } from "react-router-dom";
import { BrandTitle } from '../atoms/BrandTitle';

export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-8">
      <Link to='/'>
        <BrandTitle />
      </Link>
    </header>
  );
};

export default Header;
