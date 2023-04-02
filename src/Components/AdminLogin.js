import React, { useState, useEffect } from "react";
const SITE_KEY = process.env.SITE_KEY;
import { adminAttemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  //new code START
  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);
  //new code END
  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };
  const login = (ev) => {
    ev.preventDefault();
    //setLoading(true);
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(SITE_KEY, { action: "submit" })
        .then((token) => {
          submitData(token);
        });
    });
    dispatch(adminAttemptLogin(credentials));
    navigate("/dashboard");

    //new code START
    const submitData = (token) => {
      // call a backend API to verify reCAPTCHA response
      fetch("http://localhost:4000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          "g-recaptcha-response": token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setResponse(res);
        });
    };
    //new code END
  };
  return (
    <div className="admin-login">
      <h2>Employee Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <br></br>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <br></br>
        <button className="button button-large">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
