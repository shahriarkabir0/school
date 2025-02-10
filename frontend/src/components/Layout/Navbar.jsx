import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <ul className="flex space-x-4">
        <Link to="/" className="hover:underline cursor-pointer">
          Home
        </Link>
        <li className="hover:underline cursor-pointer">About</li>
        <li className="hover:underline cursor-pointer">Departments</li>
        <Link to="/notice" className="hover:underline cursor-pointer">
          NoticeBoard
        </Link>
      </ul>
      <div className="text-sm">
        {isLoggedIn ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
