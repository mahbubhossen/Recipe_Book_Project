import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  const handleProtectedRoute = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
      setMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-yellow-400 font-semibold" : "";

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-wrap items-center justify-between">
      <div className="text-xl font-bold flex items-center justify-between w-full md:w-auto">
        <NavLink to="/" className={navLinkClass}>
          Recipe Book
        </NavLink>
        <button
          className="md:hidden text-white text-2xl ml-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          &#9776;
        </button>
      </div>

      <div
        className={`w-full md:flex md:items-center md:w-auto ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 text-center md:text-left">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-recipes"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            All Recipes
          </NavLink>
          <NavLink
            to="/add-recipe"
            className={navLinkClass}
            onClick={(e) => {
              handleProtectedRoute(e);
              setMenuOpen(false);
            }}
          >
            Add Recipe
          </NavLink>
          <NavLink
            to="/my-recipes"
            className={navLinkClass}
            onClick={(e) => {
              handleProtectedRoute(e);
              setMenuOpen(false);
            }}
          >
            My Recipes
          </NavLink>
        </div>
      </div>

      <div className="relative mt-4 md:mt-0">
        {!user ? (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-center md:text-left">
            <NavLink
              to="/login"
              className="mb-2 md:mb-0"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-blue-600 px-3 py-1 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setShowDropdown(!showDropdown)}
              referrerPolicy="no-referrer"
              alt="User Avatar"
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg p-3 z-50">
                <p className="mb-2 font-semibold text-sm">
                  {user.displayName || "User"}
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
