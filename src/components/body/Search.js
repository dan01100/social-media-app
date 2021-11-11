import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useParams } from "react-router-dom";
import UserOption from "./UserOption.js";
import "./Body.css";

function Search() {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  let { query } = useParams();

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      let result = snapshot.docs.map((doc) => ({
        uid: doc.id,
        name: doc.data().name,
      }));

      result = result.filter((x) => x.uid !== user.uid);

      if (!query) {
        setUsers(result);
      } else {
        setUsers(
          result.filter((x) => {
            return x.name.toUpperCase().includes(query.toUpperCase());
          })
        );
      }

      return unsubscribe;
    });
  }, [query, user.uid]);

  return (
    <div className="body">
      <h3>{"Your Search: " + (query || "")} </h3>

      {users.map(({ uid, name }) => (
        <UserOption key={uid} uid={uid} name={name} />
      ))}
    </div>
  );
}

export default Search;
