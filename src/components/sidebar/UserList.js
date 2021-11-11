import React from "react";
import "./UserList.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useHistory } from "react-router";

function UserList({ title, users }) {
  const history = useHistory();

  const ListItem = ({ uid, name }) => (
    <div
      onClick={() => history.push(`/users/${uid}`)}
      key={uid}
      className="list_item"
    >
      <div className="list_item_left">
        <FiberManualRecordIcon />
      </div>

      <div className="list_item_right">
        <h4>{name}</h4>
      </div>
    </div>
  );

  return (
    <div className="user_list">
      <div className="user_list_header">
        <h2>{title}</h2>
      </div>
      {users.map(({ uid, name }) => (
        <ListItem key={uid} uid={uid} name={name} />
      ))}
    </div>
  );
}

export default UserList;
