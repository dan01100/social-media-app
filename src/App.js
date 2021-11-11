import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import SidebarLeft from "./components/sidebar/SidebarLeft";
import SideBarRight from "./components/sidebar/SideBarRight";
import Search from "./components/body/Search";
import User from "./components/body/User";
import Home from "./components/body/Home";
import MyPosts from "./components/body/MyPosts";
import Following from "./components/body/Following";
import Followers from "./components/body/Followers";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //Check if logged in
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            name: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Switch>
            <Route exact path="/signup">
              <Register />
            </Route>

            <Route path="/">
              <Login />
            </Route>
          </Switch>
        ) : (
          <>
            <Header />
            <div className="app_body">
              <SidebarLeft />

              <Switch>
                <Route exact path="/search/">
                  <Search />
                </Route>

                <Route exact path="/search/:query">
                  <Search />
                </Route>

                <Route exact path={"/users/" + user.uid}>
                  <MyPosts />
                </Route>

                <Route exact path="/users/:uid">
                  <User />
                </Route>

                <Route exact path="/following">
                  <Following />
                </Route>

                <Route exact path="/followers">
                  <Followers />
                </Route>

                <Route exact path={"/myposts"}>
                  <MyPosts />
                </Route>

                <Route path="/">
                  <Home />
                </Route>
              </Switch>

              <SideBarRight />
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
