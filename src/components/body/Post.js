import React, { useEffect, useState } from "react";
import "./Post.css";
import InputOption from "./InputOption";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import firebase from "firebase";

function Post({ id, uid, message, timestamp }) {
  const user = useSelector(selectUser);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    const formatTimestamp = (timestamp) => {
      if (timestamp == null) {
        timestamp = firebase.firestore.Timestamp.now();
      }

      const date = timestamp.toDate();
      let month = "" + (date.getMonth() + 1);
      let day = "" + date.getDate();
      let year = date.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("/");
    };

    //Format date from timestamp
    setDate(formatTimestamp(timestamp));
  }, [timestamp]);

  useEffect(() => {
    //Get username for uid
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setName(snapshot.data().name);
      });
    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    //Get number of likes / liked value
    const unsubscribe = db
      .collection("posts")
      .doc(id)
      .collection("likers")
      .onSnapshot((snapshot) => {
        setLiked(snapshot.docs.map((doc) => doc.id).includes(user.uid));
        setNumLikes(snapshot.docs.length);
      });
    return unsubscribe;
  }, [id, user.uid]);

  const likeHandler = () => {
    if (liked) {
      db.collection("posts")
        .doc(id)
        .collection("likers")
        .doc(user.uid)
        .delete();
    } else {
      db.collection("posts").doc(id).collection("likers").doc(user.uid).set({});
    }
  };

  const deletePost = () => {
    db.collection("posts").doc(id).delete();
  };

  return (
    <div className="post">
      <div className="post_header">
        <h2>{name}</h2>
        <p>{date}</p>
      </div>

      <div className="post_body">
        <p>{message}</p>
      </div>

      <div className="post_buttons">
        {liked ? (
          <InputOption
            onClick={likeHandler}
            Icon={ThumbUpIcon}
            title="Unlike"
            color="black"
          />
        ) : (
          <InputOption
            onClick={likeHandler}
            Icon={ThumbUpIcon}
            title="Like"
            color="lightgray"
          />
        )}

        <h4>Likes: {numLikes}</h4>

        {user.uid === uid && (
          <InputOption
            onClick={deletePost}
            Icon={DeleteIcon}
            title="Delete"
            color="lightgray"
          />
        )}
      </div>
    </div>
  );
}

export default Post;
