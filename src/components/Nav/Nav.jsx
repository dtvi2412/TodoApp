import React, { useEffect } from "react";
import "./Nav.css";
import { Switch, Route, Link } from "react-router-dom";
import Inbox from "../Inbox/Inbox";
import Today from "../Today/Today";
function Nav({ changeBG }) {
  useEffect(() => {
    //Write Text
    const text = "Dear friend, i wish you all the best on this day!";
    let index = 0;
    function writeText() {
      const id = document.getElementById("text");

      const rd1 = Math.floor(Math.random() * 9);
      id.style.color = `#${rd1}f${rd1}f${rd1}e`;
      id.style.fontWeight = "bold";

      id.style.transition = "all  .5s";
      id.style.fontFamily = "fantasy";
      id.innerText = text.slice(0, index);
      id.style.fontSize = 14 + "px";
      index++;

      if (index > text.length) {
        id.style.opacity = 0.5;

        id.innerText = "❤️";
        id.style.opacity = 0.2;
        id.style.visibility = "hidden";
        return;
      }

      // clearTimeout(time);
    }
    const interVal = () => {
      setInterval(() => {
        writeText();
      }, 100);
    };
    interVal();
    console.log(2);
    return () => {
      clearInterval(interVal);
    };
  }, []);
  return (
    <>
      <div id="text"></div>
      <div className={`nav ${changeBG ? "boxWhite" : "boxBlack"}`}>
        <div className="nav__content">
          <div className="nav__left">
            {" "}
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
    </>
  );
}

export default Nav;
