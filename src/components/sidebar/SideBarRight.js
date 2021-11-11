import React, { useEffect, useState } from "react";
import "./SideBarRight.css";
import { db } from "../../firebase";
import UserList from "./UserList";

function SideBarRight() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //Get a list of newest users
    const unsubscribe = db
      .collection("users")
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const users_ = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          let uid = snapshot.docs[i].id;
          let name = snapshot.docs[i].data().name;
          users_.push({ uid: uid, name: name });
        }
        setUsers(users_);
      });
    return unsubscribe;
  }, []);

  return (
    <div className="sidebar_right">
      <UserList title="New Users" users={users} />
    </div>
  );
}

export default SideBarRight;
