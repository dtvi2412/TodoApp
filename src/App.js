import React, { useState, useEffect } from "react";

import "./App.css";
import "./Home.css";

import Nav from "./components/Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";

import AndroidIcon from "@material-ui/icons/Android";
function App() {
  const getBGLocalStorage = JSON.parse(localStorage.getItem("BACKGROUND"));

  // console.log(getBGLocalStorage);
  const [changeBG, setChangeBG] = useState(getBGLocalStorage);
  useEffect(() => {
    localStorage.setItem("BACKGROUND", JSON.stringify(changeBG));
  }, [changeBG]);

  const [goApp, setGoApp] = useState(false);

  const [listImg, setListImg] = useState("");
  const random = Math.floor(Math.random() * listImg.length);
  useEffect(() => {
    //Data
    const data = [
      {
        id: 1,
        img: "https://ak.picdn.net/shutterstock/videos/1012305950/thumb/1.jpg",
      },
      {
        id: 2,
        img:
          "https://storage.googleapis.com/shopdunk-images/yeuapple/2019/03/9f42901c-hinh-nen-con-ca.jpg",
      },
      {
        id: 3,
        img: "https://cdn.hipwallpaper.com/i/59/34/l41wPh.jpg",
      },

      {
        id: 4,
        img:
          "https://i.pinimg.com/originals/31/27/99/312799559f853820e527de217465423e.png",
      },
      {
        id: 5,
        img:
          "https://i.pinimg.com/originals/a7/77/1c/a7771c5e373bd8731dd9fd455ce5c518.jpg",
      },
      {
        id: 6,
        img:
          "https://img.freepik.com/free-photo/basketball_41185-2.jpg?size=626&ext=jpg",
      },
      {
        id: 7,
        img:
          "https://cdn.vox-cdn.com/thumbor/qVjMPtyFVT5Dtwl_jSOCj4Y33TM=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15980837/elon_musk_tesla_3036.jpg",
      },
      {
        id: 8,
        img:
          "https://image.forbesvietnam.com.vn/w645/uploaded/oizwrg/oqivo.tm/2020_03_14/960x0_5_xmnb.jpg",
      },
      {
        id: 9,
        img:
          "https://mcnewsmd1.keeng.net/tiin/archive/images/20200417/161059_0_black_panther.jpg",
      },
    ];
    setListImg(data);
  }, []);
  const handleGoApp = () => {
    const btnStart = document.getElementById("start");
    const btnStart1 = document.getElementById("start1");
    const homeContent = document.getElementById("homeContent");
    const home = document.getElementById("home");

    //Tao point waiting
    const point1 = document.createElement("div");
    const point2 = document.createElement("div");
    const point3 = document.createElement("div");
    // const waiting = document.createElement("div");

    point1.classList.add("point1");
    point2.classList.add("point2");
    point3.classList.add("point3");
    // waiting.classList.add("waiting");
    // waiting.innerText = "WAITING";
    home.classList.add("homeWait");

    // point.innerText = "POINT WAIT";

    homeContent.appendChild(point1);
    homeContent.appendChild(point2);
    homeContent.appendChild(point3);
    // homeContent.appendChild(waiting);

    btnStart.classList.add("hideStart");
    btnStart1.classList.add("hideStart");
    // btnStart.innerHTML = "WAITING...";
    const hello = document.getElementById("hello");
    hello.classList.remove("hideHello");
    hello.classList.toggle("home__hello");

    setTimeout(() => {
      setGoApp(true);
    }, 3000);
    // setChangeBG(true);
  };

  const handleGoApp1 = () => {
    const btnStart = document.getElementById("start");
    const btnStart1 = document.getElementById("start1");
    const homeContent = document.getElementById("homeContent");
    const home = document.getElementById("home");

    //Tao point waiting

    // const waiting = document.createElement("div");

    // waiting.classList.add("waiting");

    // waiting.innerHTML = "WAITING";

    home.classList.add("homeWait");

    // point.innerText = "POINT WAIT";

    // homeContent.appendChild(waiting);

    btnStart1.classList.add("hideStart");
    btnStart.classList.add("hideStart");
    // btnStart.innerHTML = "WAITING...";

    for (let i = 0; i < 1500; i++) {
      let random = Math.random() + 0.2;
      const point = document.createElement("div");
      point.classList.add("point");

      point.style.setProperty("--animation-time", random + "s");
      point.style.setProperty("--animation-delay", random + "s");

      let random1 = Math.floor(Math.random() * 100);
      let random2 = Math.floor(Math.random() * 200);
      let random3 = Math.floor(Math.random() * 300);

      point.style.setProperty(
        "--bgColor",
        `rgba(${random1},${random2},${random3})`
      );

      homeContent.appendChild(point);
    }
    const hello = document.getElementById("hello");
    hello.classList.remove("hideHello");
    hello.classList.toggle("home__hello");

    setTimeout(() => {
      setGoApp(true);
    }, 3000);
    // setChangeBG(false);
    // setHello(true);
  };
  return (
    <BrowserRouter>
      {/* Set HOME  */}
      {!goApp && (
        <>
          <div
            id="home"
            className="home"
            style={{
              backgroundImage: `url("${listImg[random]?.img}")`,
            }}
          >
            <div className="homeContentStart">
              {/* <div className="home__icon">
                <EmojiEmotionsIcon />
              </div> */}
              <div className="homeContentStart__one">
                {" "}
                <h1
                  id="start"
                  className="home__start"
                  onClick={() => {
                    handleGoApp();
                  }}
                >
                  <AppsIcon />
                </h1>
              </div>
              <div className="homeContentStart__two">
                <h1
                  id="start1"
                  className="home__start1"
                  onClick={() => {
                    handleGoApp1();
                  }}
                >
                  <HomeIcon />
                </h1>
              </div>

              <div id="hello" className="hideHello">
                <AndroidIcon />
              </div>

              <div id="homeContent"></div>
            </div>
          </div>
        </>
      )}

      {goApp && (
        <div className={`${changeBG ? "App" : "AppBgChange"}`}>
          <div
            onClick={() => {
              setChangeBG(!changeBG);
            }}
            className={` ${
              changeBG
                ? "pointChangeWhite pointChange"
                : "pointChangeBlack pointChange1"
            }`}
          />
          <Nav changeBG={changeBG} />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
