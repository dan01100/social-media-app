import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import "./SidebarLeft.css";
import background from "./background.jpg";
import UserList from "./UserList";

function SidebarLeft() {
  const user = useSelector(selectUser);
  const [following, setFollowing] = useState([]);
  const [numFollowers, setNumFollowers] = useState(0);

  useEffect(() => {
    //Get people the user follows
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("following")
      .orderBy("timestamp", "desc")
      .limit(5)
      .onSnapshot(async (snapshot) => {
        const userRef = db.collection("users");
        const following = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          let follows = await userRef.doc(snapshot.docs[i].id).get();
          following.push({
            uid: snapshot.docs[i].id,
            name: follows.data().name,
          });
        }
        setFollowing(following);
      });

    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    //Get number of followers
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("followers")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => setNumFollowers(snapshot.docs.length));

    return unsubscribe;
  }, [user.uid]);

  return (
    <div className="sidebar_left">
      <div className="sidebar_left_top">
        <img src={background} alt="background" />
        <Avatar className="sidebar_left_avatar">
          {user.name ? user.name[0] : ""}
        </Avatar>
        <h2>{user.name}</h2>
      </div>

      <div className="sidebar_left_stats">
        <div className="sidebar_left_stat">
          <p>Total Followers:</p>
          <p className="sidebar_left_statNumber">{numFollowers}</p>
        </div>
      </div>

      <div className="sidebar_left_bottom">
        <UserList title="Recently followed" users={following} />
      </div>
    </div>
  );
}

export default SidebarLeft;
