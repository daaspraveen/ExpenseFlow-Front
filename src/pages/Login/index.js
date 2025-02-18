import {useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { IoMailOutline } from "react-icons/io5";
import { TbLockPassword, TbEye, TbEyeClosed } from "react-icons/tb";

import { login } from "../../api/api.js";

import "./styledComponents.css";

const Login = () => {
  const navigateTo = useNavigate();

  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, toggleShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      navigateTo("/");
    }
  }, [navigateTo]);


  const handleFormInputs = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData", formData);
    const allGiven = Object.values(formData).every(
      (element) => element.length > 0
    );

    if (allGiven) {
      setErrorMsg("");
      setIsLoading(true);
      try {
        const loginResp = await login(formData.email, formData.password);
        // console.log('loginResp', loginResp)
        const token = loginResp;

        if (token) {
          localStorage.setItem("jwt_token", token);
          // console.log('checking', localStorage.getItem("jwt_token"))
          setIsLoading(false)
          navigateTo("/"); 
        }
      } catch (e) {
        setIsLoading(false);
        setErrorMsg(e.message);
      }
    } else {
      setErrorMsg("*Enter Details");
    }
  };

  const doToggleShowPass = () => {
    toggleShowPassword((prevState) => !prevState);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <form className="auth-form signup-form" onSubmit={doSubmit}>
          <img
            src="/logos/logo-2-removebg.png"
            alt="logo"
            loading="lazy"
            className="auth-logo"
          />
          <h1 className="auth-form-head">Welcome Back</h1>
          <div className="input-box">
            <label className="form-label" htmlFor="email">
              EMAIL
            </label>
            <div className="form-input-box">
              <IoMailOutline size={20} color="black" className="form-icon" />
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter Email"
                onChange={handleFormInputs}
                value={formData.email}
                required
              />
            </div>
          </div>
          <div className="input-box">
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <div className="form-input-box">
              <TbLockPassword size={20} color="black" className="form-icon" />
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter Password"
                onChange={handleFormInputs}
                value={formData.password}
                required
              />
              <button
                type="button"
                onClick={doToggleShowPass}
                className="show-pass-btn"
              >
                {showPassword ? (
                  <TbEye size={20} color="black" />
                ) : (
                  <TbEyeClosed size={20} color="black" />
                )}
              </button>
            </div>
          </div>
          <input
            type="submit"
            className="auth-form-button"
            value={isLoading ? "Logging in..." : "Log in"}
            disabled={isLoading}
          />
          <p className="error-msg">{errorMsg}</p>
        </form>
        <p className="had-account-para">
          Create a New account? Do{" "}
          <Link to="/signup" className="already-login-link">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
