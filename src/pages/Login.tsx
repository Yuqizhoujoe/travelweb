import React, { FormEvent, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import googleLogo from "../assets/google.webp";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      // Store the token in the Cookie
      Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });
      navigate("/");
    } catch (error: any) {
      setError((error as Error).message);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();

      // Store the token in the Cookie
      Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });

      // navigate to Blogs home page
      navigate("/");
    } catch (error: any) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Sign in</h1>

        <input
          type="email"
          name="email"
          id="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>

      <hr className="login-divider" />

      <button
        type="button"
        className="google-login-btn"
        onClick={handleGoogleLogin}
      >
        <img src={googleLogo} alt="Google Login" />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
