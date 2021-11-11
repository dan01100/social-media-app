import React, { useState } from "react";
import "./PostInput.css";
import CreateIcon from "@material-ui/icons/Create";
import { db } from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function PostInput() {
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");

  const sendPost = (e) => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    db.collection("posts").add({
      uid: user.uid,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="post_input_container">
      <div className="post_input">
        <CreateIcon />
        <form className="post_form" onSubmit={sendPost}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a new post..."
          />
        </form>
      </div>
    </div>
  );
}

export default PostInput;
