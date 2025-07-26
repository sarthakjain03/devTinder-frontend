import { useState } from "react";
import axiosClient from "../axios/axiosClient";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoginError("");
      const response = await axiosClient.post(
        "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response?.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoginError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      setLoginError("");
      const response = await axiosClient.post(
        "/signup",
        {
          name,
          gender,
          age,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response?.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setLoginError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-10 pb-32">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <div className="pt-4 pb-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="pb-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="pb-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <div className={`${isLoginForm && "pt-4"} pb-2`}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="pb-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500 text-center pb-1 mt-0">{loginError}</p>
          <div className="card-actions justify-center">
            {isLoginForm ? (
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            )}
          </div>
          <div className="pt-2 text-center">
            {isLoginForm ? (
              <p className="text-sm">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLoginForm(false)}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLoginForm(true)}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
