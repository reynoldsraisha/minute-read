import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { GoogleLogout } from "react-google-login";
import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("Harry Potter");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">Minute Read</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar src={userData?.imageUrl} alt={userData?.name} />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="1027355255792-hniuncr3qjhlgfbd66uddcrv7safo4u3.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
