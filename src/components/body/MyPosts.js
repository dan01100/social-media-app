import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import "./Body.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Feed from "./Feed.js";
import PostInput from "./PostInput.js";

function MyPosts() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("uid", "==", user.uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            message: doc.data().message,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    return unsubscribe;
  }, [user.uid]);

  return (
    <div className="body">
      <PostInput />
      <Feed posts={posts} />
    </div>
  );
}

export default MyPosts;
