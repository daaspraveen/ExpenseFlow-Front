import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { LuUserRound } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { TbLockPassword, TbEye, TbEyeClosed } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";

import { signup } from "../../api/api.js"; // Import the signup function from api.js

import "./styledComponents.css";

const SignUp = () => {
  const navigateTo = useNavigate();
  const [formData, updateFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, toggleShowPassword] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleFormInputs = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    // console.log('in submit')
    const allGiven = Object.values(formData).every((element) => element.length > 0);
    if (allGiven) {
      setIsSigning(prevState => !prevState)
      try {
        const result = await signup(formData.username, formData.email, formData.password); // Call the API helper function
        if (result) {
          setSignUpSuccess(true);
        }
      } catch (error) {
        // console.log(error.message)
        setErrorMsg(error.message);
        setSignUpSuccess(false);
        setIsSigning(prevState => !prevState)
      }
    } else {
      setErrorMsg("*Enter Details");
      setSignUpSuccess(false);
    }
  };

  const doToggleShowPass = () => {
    toggleShowPassword((prevstate) => !prevstate);
  };

  const redirectToLogin = () => {
    navigateTo("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {!signUpSuccess ? (
          <>
            <form className="auth-form signup-form" onSubmit={doSubmit}>
              <img src="/logos/logo-2-removebg.png" alt="logo" loading="lazy" className="auth-logo" />
              <h1 className="auth-form-head">Create an Account</h1>
              <div className="input-box">
                <label className="form-label" htmlFor="username">USERNAME</label>
                <div className="form-input-box">
                  <LuUserRound size={20} color="black" className="form-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input"
                    placeholder="Enter Username"
                    onChange={handleFormInputs}
                    disabled={isSigning}
                    value={formData.username}
                    required
                  />
                </div>
              </div>
              <div className="input-box">
                <label className="form-label" htmlFor="email">EMAIL</label>
                <div className="form-input-box">
                  <IoMailOutline size={20} color="black" className="form-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter Email"
                    onChange={handleFormInputs}
                    disabled={isSigning}
                    value={formData.email}
                    required
                  />
                </div>
              </div>
              <div className="input-box">
                <label className="form-label" htmlFor="password">PASSWORD</label>
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
                    disabled={isSigning}
                    required
                  />
                  <button type="button" onClick={doToggleShowPass} className="show-pass-btn">
                    {showPassword ? <TbEye size={20} color="black" /> : <TbEyeClosed size={20} color="black" />}
                  </button>
                </div>
              </div>
              <input
                type="submit"
                className="auth-form-button"
                value={isSigning ? "Signing Up ..." : "Sign Up"}
                disabled={isSigning}
              />
              <p className="error-msg">{errorMsg}</p>
            </form>
            <p className="had-account-para">
              Already have an account? Do <Link to="/login" className="already-login-link">Login</Link>
            </p>
          </>
        ) : (
          <div className="signup-success-box">
            <SiTicktick size={50} color="green" />
            <p className="signup-success-para">Successfully Created an Account</p>
            <button type="button" className="login-btn" onClick={redirectToLogin}>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
