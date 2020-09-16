import React from "react";
import "./Nav.css";
import { Switch, Route, Link } from "react-router-dom";
import Inbox from "../Inbox/Inbox";
import Today from "../Today/Today";
function Nav({ changeBG }) {
  return (
    <div className={`nav ${changeBG ? "boxWhite" : "boxBlack"}`}>
      <div className="nav__content">
        <div className="nav__left">
          <h1 className="nav__text">TodoList</h1>

          <nav>
            <ul>
              <Link
                className={`color ${changeBG ? "colorWhite" : "colorBlack"}`}
                to="/inbox"
              >
                Inbox
              </Link>

              <Link
                className={`color ${changeBG ? "colorWhite" : "colorBlack"}`}
                to="/today"
              >
                Today
              </Link>

              {/* <li>
                <a href="#">Next 7 days</a>
              </li> */}
            </ul>
          </nav>
        </div>
        <div
          className={`nav__right ${
            changeBG ? "boxRightWhite" : "boxRightBlack"
          }`}
        >
          <div className="nav__right__content">
            <Switch>
              <Route component={Inbox} path="/inbox" />
              <Route
                component={() => {
                  return <Today changeBG={changeBG} />;
                }}
                path="/today"
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
