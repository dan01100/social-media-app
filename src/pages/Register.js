import React, { useState } from "react";
import { login } from "../features/userSlice";
import "./Login.css";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [attemptingRegister, setAttemptingRegister] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const usernameTaken = async (name) => {
    const doc = await db.collection("users").where("name", "==", name).get();
    return !doc.empty;
  };

  const register = async (e) => {
    e.preventDefault();

    if (attemptingRegister) {
      return;
    } else {
      setAttemptingRegister(true);
    }

    if (password !== confirmPassword) {
      setAttemptingRegister(false);
      return alert("Passwords don't match!");
    }

    if (!name) {
      setAttemptingRegister(false);
      return alert("Please enter a full name!");
    }

    if (await usernameTaken(name)) {
      setAttemptingRegister(false);
      return alert("Username taken!");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            db.collection("users").doc(userAuth.user.uid).set({
              name: name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                name: userAuth.user.displayName,
              })
            );
          })
          .then(() => history.push("/"));
      })
      .catch((error) => {
        alert(error);
        setAttemptingRegister(false);
      });
  };

  return (
    <div className="login">
      <h1>Register</h1>

      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          type="text"
        />
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
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
        />

        <button disabled={attemptingRegister} type="submit" onClick={register}>
          Register
        </button>
        <p>
          Already a member?
          <span
            className="login_register"
            onClick={() => history.push("/login")}
          >
            &nbsp;Back to login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
