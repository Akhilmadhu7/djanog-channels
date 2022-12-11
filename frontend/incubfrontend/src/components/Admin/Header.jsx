import React, { useContext, useEffect, useState } from "react";
import AuthContext, { AuthProvider } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  let { user, admin, authTokens, logoutAdmin } = useContext(AuthContext);

  return (
    <div>
      <nav className="bg-indigo-800 flex rounded-md mb-2 justify-between">
        <div className=" mx-6 my-4">
          <h1 className="text-white text-2xl font-semibold">Incubation </h1>
        </div>

        <div className="my-4 mx-6 flex">
          <div className="mx-5 text-white mt-auto">
            {<h3 className="font-bold">{admin && <p> {admin.username}</p>}</h3>}
          </div>

          <button
            onClick={logoutAdmin}
            className=" w-full px-2 py-1 tracking-wide bg-slate-200 font-medium transition-colors duration-200 transform bg-white-700 rounded-md hover:bg-violet-50 hover:text-red-600 focus:outline-none "
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
