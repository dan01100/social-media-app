import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import UserOption from "./UserOption.js";
import Feed from "./Feed.js";
import "./Body.css";

function User() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState(undefined);
  let { uid } = useParams();

  useEffect(() => {
    //Get username from uid
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setName(snapshot.get("name"));
      });

    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    //Get posts for user with uid
    const unsubscribe = db
      .collection("posts")
      .where("uid", "==", uid)
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
  }, [uid]);

  return (
    <div className="body">
      {name ? (
        <div>
          <UserOption
            uid={uid}
            name={
              name[name.length - 1] === "s" ? name + "' page" : name + "'s page"
            }
          />
          <Feed posts={posts} />
        </div>
      ) : (
        <h3>No User with that id</h3>
      )}
    </div>
  );
}

export default User;
