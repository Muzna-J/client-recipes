import { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navbar;
