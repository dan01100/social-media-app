import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import UserOption from "./UserOption.js";
import "./Body.css";

function Following() {
  const user = useSelector(selectUser);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    //Get list of followers
    const unsubscibe = db
      .collection("users")
      .doc(user.uid)
      .collection("followers")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snapshot) => {
        const followers_ = [];
        const usersRef = db.collection("users");
        for (let i = 0; i < snapshot.docs.length; i++) {
          //Get follower usernames
          let follower = await usersRef.doc(snapshot.docs[i].id).get();
          followers_.push({
            uid: snapshot.docs[i].id,
            name: follower.data().name,
          });
        }

        setFollowers(followers_);
      });
    return unsubscibe;
  }, [user.uid]);

  return (
    <div className="body">
      <h3 style={{ marginBottom: "10px" }}>People who follow you</h3>

      {/*Posts*/}
      {followers.map(({ uid, name }) => (
        <UserOption key={uid} uid={uid} name={name} />
      ))}
    </div>
  );
}
export default Following;
