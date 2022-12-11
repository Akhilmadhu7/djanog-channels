import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const baseUrl = "http://127.0.0.1:8000/register";

function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState:{errors}
  } = useForm();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(userData);

  const onSubmit = (data,e) => {
    e.preventDefault();
    
    Axios.post(baseUrl, {
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.password2,
    }).then((response) => {
      console.log(response.data);
      navigate("/");
    });
  
  };

  

  return (
    <div>
      <div className="relative  flex-col justify-center min-h-screen overflow-hidden grid  sm:grid-cols-1">
        <div className="p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
            Sign UP
          </h1>
          <form className="mt-6 text-left " onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="  justify-around grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800 "
                  >
                    Firstname
                  </label>

                  <input
                  {...register("first_name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message:
                        "Must be Characters & should not be less than 3",
                    },
                  })}
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.first_name && (
                      <small className="text-red-500">
                        {errors.first_name.message}
                      </small>
                    )}
                  
                </div>

                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Lastname
                  </label>
                  <input
                  {...register("last_name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message:
                        "Must be Characters & should not be less than 3",
                    },
                  })}
                    type="text"
                    onChange={handleChange}
                    name="last_name"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.last_name && (
                      <small className="text-red-500">
                        {errors.last_name.message}
                      </small>
                    )}
                  
                </div>
              </div>
              <div className="mb-2  justify-around grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Username
                  </label>
                  <input
                  {...register("username",{
                    required: "Username required"
                  })}
                    type="text"
                    onChange={handleChange}
                    name="username"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.username && (
                      <small className="text-red-500">
                        {errors.username.message}
                      </small>
                    )}
                 
                </div>

                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/,
                      message: "Invalid email",
                    },
                  })}
                    type="email"
                    onChange={handleChange}
                    name="email"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
                    )}
                  
                </div>
              </div>
              <div className="mb-2  justify-around grid sm:grid-cols-1 md:grid-cols-2'">
                <div>
                  <label
                  
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                  {...register("password", {
                    required: "Password required",
                    pattern: {
                      value: /^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$/,
                      message: "Password should be strong"
                    },
                    minLength: {
                      value: 8,
                      message: "Password should not be less than 8 characters"
                    }
                  })}
                    type="password"
                    onChange={handleChange}
                    name="password"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && (
                      <small className="text-red-500">
                        {errors.password.message}
                      </small>
                    )}
                  
                </div>

                <div>
                  <label
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Confirm Password
                  </label>
                  <input
                  {...register("password2", {
                    required: "Password required",
                    pattern: {
                      value: /^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$/,
                      message: "Password should be strong"
                    },
                    minLength: {
                      value: 8,
                      message: "Password should not be less than 8 characters"
                    },
                    validate:(value) => {
                      const {password} = getValues();
                      return password === value || 'Password should match'
                    }
                  })}
                    type="password"
                    onChange={handleChange}
                    name="password2"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password2 && (
                      <small className="text-red-500">
                        {errors.password2.message}
                      </small>
                    )}
                  
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Signup
                </button>
              </div>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
