import React from "react";
import { useNavigate } from "react-router-dom"; 

function Headers() {
    const navigate = useNavigate()
  return (
    <div>
      <nav className="bg-indigo-800 flex justify-between">
        <div className=" mx-6 my-4">
          <h1 onClick={()=>navigate('/home')} className="text-white text-2xl hover:cursor-pointer font-semibold">Incubation </h1>
        </div>

        <div className="my-4 mx-6 flex">
          <div className="mx-5 text-white mt-auto">
            <h3 onClick={()=>navigate("/chat")}>Chat</h3>
            {/* <h3 className='font-bold' >{user}.name</h3> */}
            {/* {<h3 className="font-bold">{user && <p> {user.username}</p>}</h3>} */}
          </div>

          <button
            // onClick={logoutUser}
            className=" w-full px-2 py-1 tracking-wide bg-slate-200 font-medium transition-colors duration-200 transform bg-white-700 rounded-md hover:bg-violet-50 hover:text-red-600 focus:outline-none "
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Headers;
