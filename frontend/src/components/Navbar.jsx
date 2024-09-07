import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <div className="flex items-center">
          <img
            className="h-16 object-contain sm:h-12 xs:h-8"
            src={assets.uni_logo}
            alt="uni logo"
          />

          <div className="ml-2 hidden sm:block">
            <p className="m-0 text-black text-sm">
              Department of Computer Engineering
            </p>
            <p className="m-0 text-black text-xs">University of Peradeniya</p>
          </div>
        </div>
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>INVENTORY</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/orders" className="flex flex-col items-center gap-1">
          <p>DASHBOARD</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
