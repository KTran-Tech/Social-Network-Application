import React from "react";
/*You can get access to the history object’s properties 
via the withRouter higher-order component. withRouter will
pass updated match, location, and history props to the 
wrapped component */
/*Think of 'history location pathname' as the pages current path location*/
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  return history.location.pathname === path
    ? { color: "#ff9900" }
    : { color: "#ffffff" };
};

export const signout = (next) => {
  //if the window is NOT empty
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  //redirects user by executing the middleware passed in
  next();
  return fetch("http://localhost:8080/api/auth/signout", {
    method: "GET",
  })
    .then((response) => {
      console.log("signout", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

const Menu = ({ history }) => (
  <section>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      {/* if 'isAuthenticated' is not true, then display */}
      {!isAuthenticated() && (
        <section>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </section>
      )}

      {/* if is not authenticated, meaning not signed in */}
      {isAuthenticated() && (
        <section>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              //forces the path location to be '/'
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </a>
          </li>
        </section>
      )}
    </ul>
  </section>
);

export default withRouter(Menu);