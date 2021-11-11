import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import FaceIcon from "@material-ui/icons/Face";
import { auth } from "../../firebase";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  const search = (e) => {
    e.preventDefault();
    history.push(`/search/${input}`);
    setInput("");
  };

  return (
    <div className="header">
      <div className="header_left">
        <HeaderOption
          Icon={HomeIcon}
          title="Home"
          onClick={() => history.push(`/`)}
        />

        <form className="header_search" onSubmit={search}>
          <SearchIcon />
          <input
            placeholder="Search"
            value={input}
            onChange={(x) => setInput(x.target.value)}
            type="text"
          />
        </form>
      </div>

      <div className="header_right">
        <HeaderOption
          Icon={FaceIcon}
          title="My Posts"
          onClick={() => history.push(`/myposts`)}
        />
        <HeaderOption
          Icon={PeopleIcon}
          title="Followers"
          onClick={() => history.push("/followers")}
        />
        <HeaderOption
          Icon={PeopleOutlineIcon}
          title="Following"
          onClick={() => history.push("/following")}
        />
        <HeaderOption Icon={ExitToApp} onClick={logoutOfApp} title="Log Out" />
      </div>
    </div>
  );
}

export default Header;
