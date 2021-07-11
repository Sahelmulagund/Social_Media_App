import "./Login.css";
import React, { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
export default function Login() {
  const email = useRef();
  const password = useRef();
const {user, isFetching, error, dispatch} = useContext(AuthContext);


  const handleClick = (e) => {
   e.preventDefault();
   loginCall({email:email.current.value,password:password.current.value}, dispatch)
  };
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="logiNLogo">SocialApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialApp.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" className="loginInput" type='email' ref={email} required/>
            <input placeholder="Password" minLength="6" className="loginInput" type="password" ref={password} required/>
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress size="30px" color="white"/> : "Log In" }</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" type="submit" disabled={isFetching}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}