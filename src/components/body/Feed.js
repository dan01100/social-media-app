import React from "react";
import Post from "./Post.js";

function Feed({ posts }) {
  return (
    <div>
      {/*Posts*/}
      {posts.map(({ id, uid, message, timestamp }) => (
        <Post
          key={id}
          id={id}
          uid={uid}
          message={message}
          timestamp={timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
