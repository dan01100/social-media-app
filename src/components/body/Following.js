import React, { useState, useEffect } from "react";
import UserOption from "./UserOption.js";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Body.css";

function Following() {
  const user = useSelector(selectUser);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    //Get list of users that the user is following
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("following")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snapshot) => {
        const following_ = [];
        const usersRef = db.collection("users");
        for (let i = 0; i < snapshot.docs.length; i++) {
          //Get usernames
          let user = await usersRef.doc(snapshot.docs[i].id).get();
          following_.push({ uid: snapshot.docs[i].id, name: user.data().name });
        }

        setFollowing(following_);
      });
    return unsubscribe;
  }, [user.uid]);

  return (
    <div className="body">
      <h3 style={{ marginBottom: "10px" }}>People you follow</h3>

      {/*Posts*/}
      {following.map(({ uid, name }) => (
        <UserOption key={uid} uid={uid} name={name} />
      ))}
    </div>
  );
}
export default Following;
