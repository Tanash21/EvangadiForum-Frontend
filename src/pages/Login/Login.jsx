import React, { useRef, useState } from "react";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    let hasError = false;
    if (!emailValue) {
      setEmailError("Email is required!");
      hasError = true;
    }
    if (!passValue) {
      setPasswordError("Password is required!");
      hasError = true;
    }
    if (hasError) return;

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      // alert("login successful!");
      // console.log(data);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      // alert(error.response.data.msg);
      setLoginError(error?.response?.data?.msg || "Login failed");
      console.log(error.response.data);
    }
  }
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Login to your account</h2>
      <p className={classes.text}>
        Don't have an account?{" "}
        <a href="#" className={classes.link}>
          Create a new account
        </a>
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={classes.input_group}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email adress"
              style={{
                border: emailError ? "1px solid #f04438" : "1px solid #ccc",
              }}
            />
            {emailError && (
              <small style={{ paddingTop: "5px", color: "red" }}>
                {emailError}
              </small>
            )}
          </div>
          <br />
          <div className={classes.input_group}>
            <input
              ref={passwordDom}
              type="password"
              placeholder="Password"
              style={{
                border: passwordError ? "1px solid #f04438" : "1px solid #ccc",
              }}
            />
            {passwordError && (
              <small style={{ paddingTop: "5px", color: "red" }}>
                {passwordError}
              </small>
            )}
          </div>
          <p className={classes.form_footer}>
            <a href="#" className={classes.link}>
              Forgot password?
            </a>
          </p>
          <button type="submit" className={classes.btn}>
            Login
          </button>
        </form>
        {loginError && (
          <small style={{ paddingTop: "5px", color: "red" }}>
            {loginError}
          </small>
        )}
      </div>
    </section>
  );
}

export default Login;
