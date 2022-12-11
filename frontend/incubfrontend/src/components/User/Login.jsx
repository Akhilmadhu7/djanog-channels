import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  let { loginUser, authTokens } = useContext(AuthContext);
  let { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authTokens != null) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [authTokens]);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setFormErrors(validate(userData));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(userData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h3>
                  {user && (
                    <p className="text-white-200">hello {user.username}</p>
                  )}
                </h3>
                <h2 className="text-4xl font-bold text-white">Brand</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  We help you to achieve your goals
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-1/2 ">
            <div className="flex-1">
              <div className="text-center  p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                  Login
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Login in to access your account
                </p>
              </div>

              <div className="mt-8  p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                <form onSubmit={loginUser}>
                  <div>
                    <label
                      for="name"
                      className="block text-sm font-semibold text-gray-800 text-left "
                    >
                      Username
                    </label>

                    <input
                      type="text"
                      name="username"
                      id="text"
                      placeholder="username"
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <p className="text-red-600">{formErrors.username}</p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        for="password"
                        // className="text-sm text-gray-600 dark:text-gray-200"
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        Password
                      </label>
                      <a className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
                        Forgot password?
                      </a>
                    </div>

                    <input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <p className="text-red-600">{formErrors.password}</p>
                  </div>

                  <div className="mt-6">
                    {/* <Link to='/'> */}
                    <button
                      onClick={handleSubmit}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                      Login
                    </button>
                    {/* </Link> */}
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
