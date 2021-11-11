import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import "./UserOptions.css";
import firebase from "firebase";

                                   
function UserOption({ uid, name }) {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    //Check is user is following
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("following")
      .doc(uid)
      .onSnapshot((doc) => {
        setIsFollowing(doc.exists);
      });
    return unsubscribe;
  }, [uid, user.uid]);

  const followHandler = () => {
    const unfollow = () => {
      db.collection("users")
        .doc(uid)
        .collection("followers")
        .doc(user.uid)
        .delete();

      db.collection("users")
        .doc(user.uid)
        .collection("following")
        .doc(uid)
        .delete();
    };

    const follow = () => {
      db.collection("users")
        .doc(uid)
        .collection("followers")
        .doc(user.uid)
        .set({ timestamp: firebase.firestore.FieldValue.serverTimestamp() });

      db.collection("users")
        .doc(user.uid)
        .collection("following")
        .doc(uid)
        .set({ timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    };

    if (isFollowing) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <div className="user_option">
      <div onClick={() => history.push("/users/" + uid)}>
        <h2>{name}</h2>
      </div>
      {isFollowing ? (
        <button onClick={followHandler}>Unfollow</button>
      ) : (
        <button onClick={followHandler}>Follow</button>
      )}
    </div>
  );
}

export default UserOption;
