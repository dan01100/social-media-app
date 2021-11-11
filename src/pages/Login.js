import React, { useState } from "react";
import "./Login.css";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [attemptingLogin, setAttemptingLogin] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const loginToApp = (e) => {
    e.preventDefault();

    if (attemptingLogin) {
      return;
    } else {
      setAttemptingLogin(true);
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            name: userAuth.user.displayName,
          })
        );
      })
      .then(() => history.push("/"))
      .catch((error) => {
        alert(error);
        setAttemptingLogin(false);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button disabled={attemptingLogin} type="submit" onClick={loginToApp}>
          Sign in
        </button>
        <p>
          Not a member?
          <span
            className="login_register"
            onClick={() => history.push("/signup")}
          >
            &nbsp;Register Now
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
