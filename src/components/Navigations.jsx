/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react";

function Navigations() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  function handleClick(){
    localStorage.removeItem('token'); // Remove the stored token
    setIsLoggedIn(false);
    }
  return (
    <div className="nav">
      {localStorage.getItem("token") ? (
        <>
          <Link to="/account">Account</Link>
          <Link to="/Books">Books</Link>
          <Link to ="/Books" onClick={() => {
              handleClick()
          }}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/Books">Books</Link>
          <Link to="/Register">Register</Link>
          <Link to="/Login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Navigations;
