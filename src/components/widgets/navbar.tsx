import React from "react";
import SignOut from "../auth/signout";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1>YourCrush</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <SignOut />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
