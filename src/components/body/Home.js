import React, { useState, useEffect } from "react";
import "./Body.css";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Feed from "./Feed.js";
import PostInput from "./PostInput.js";

function Home() {
  const user = useSelector(selectUser);

  const [following, setFollowing] = useState([user.uid]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //Get id of the people that the user followers
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("following")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snapshot) => {
        const following_ = snapshot.docs.map((user) => user.id);
        following_.push(user.uid);
        setFollowing(following_);
      });
    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    //Get posts of users that the user followers (most recent 10 followers)
    const unsubscribe = db
      .collection("posts")
      .where(
        "uid",
        "in",
        following.slice(
          following.length - 10 > 0 ? following.length - 10 : 0,
          following.length
        )
      )
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            message: doc.data().message,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return unsubscribe;
  }, [following]);

  return (
    <div className="body">
      <PostInput />
      <Feed posts={posts} />
    </div>
  );
}

export default Home;
