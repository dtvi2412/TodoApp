import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import "./Today.css";
function Today({ changeBG }) {
  //Update listTodo from local
  const [dateTime, setDateTime] = useState("");
  const [hourTime, setHourTime] = useState(new Date());

  const currentTime = () => {
    setHourTime(new Date());
  };

  //Array Listodo
  const [listTodo, setListTodo] = useState([]);

  useEffect(() => {
    //Get list from localstorage
    const getLocalListTodo = JSON.parse(localStorage.getItem("ListToDoNow"));

    //Fetch data to localStorage
    const fetLocal = () => {
      if (getLocalListTodo) {
        setListTodo(getLocalListTodo);
      } else {
        return;
      }
    };
    fetLocal();
    return () => {
      fetLocal();
    };
  }, []);
  //Set listTodo to localStorage
  useEffect(() => {
    //SET DATE
    const getdate = new Date();
    const setDate = getdate.toLocaleDateString();
    setDateTime(setDate);
    // console.log(setDate);
    //Clone Array listToDo ,Filter Date === dateTime
    const cloneListToDo = [...listTodo];
    const filterListToDoInDate = cloneListToDo.filter(
      (item) => item.date === dateTime
    );
    if (filterListToDoInDate) {
      localStorage.setItem("ListToDoNow", JSON.stringify(filterListToDoInDate));
    }
    //Update Hour 1s
    const hourNow = setInterval(() => {
      currentTime();
    }, 1000);
    return () => {
      clearInterval(hourNow);
    };
  }, [listTodo, dateTime]);

  const [valueInput, setValueInput] = useState("");

  const onChange = (e) => {
    setValueInput(e.target.value);
  };
  const handleListToDo = (e) => {
    e.preventDefault();

    setListTodo([
      ...listTodo,
      {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        values: valueInput,
        check: false,
      },
    ]);

    //Update hide button
    setValueInput("");
    //Clear value input
    const fieldInput = document.getElementById("inputToday");
    fieldInput.value = "";
    // console.log("listTodo", listTodo);
  };
  //handleClearText
  const handleClearText = () => {
    //Clear value input

    const fieldInput = document.getElementById("inputToday");
    if (fieldInput.value !== "") {
      fieldInput.value = "";
      setValueInput("");
    } else {
      alert("no message");
    }
  };
  const [deletepopUp, setDeletepopUp] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [checkId, setCheckId] = useState("");
  const handleDeleteItem = (id, value) => {
    //Open Popup
    setDeletepopUp(true);
    //Update Check
    setCheckDelete(true);
    //Set CheckID
    setCheckId(id);
    // console.log(id);
  };

  const handleCheckDelete = () => {
    setCheckDelete(true);

    //IF
    // console.log("checkDelete 2", checkDelete);
    if (checkDelete) {
      //Clone Array ListTodo
      const cloneList = [...listTodo];
      //Filter array.id !== checkID and Update Array ListTodo
      const find = cloneList.filter((item) => item.id !== checkId);
      setListTodo(find);
    }
    // console.log("checkDelete 1", checkDelete);
    setDeletepopUp(false);
  };

  //Edit popup
  const [edit, setEdit] = useState(false);
  const [editID, setEditId] = useState({});
  const [inputEdit, setInputEdit] = useState("");
  const onChangeEdit = (e) => {
    setInputEdit(e.target.value);
  };
  const handleEditItem = (id, values) => {
    setEdit(true);
    setEditId({
      id: id,
      values: values,
    });
  };
  const handleEditOk = () => {
    if (inputEdit !== "") {
      const cloneList = [...listTodo];

      const find = cloneList.map((item) => {
        if (item.id === editID.id) {
          return { ...item, values: inputEdit };
        } else {
          return { ...item };
        }
      });

      setListTodo(find);
      setEdit(false);
    }
  };

  const handleCloseEdit = () => {
    setEdit(false);
    setInputEdit("");
  };

  //DeleteALL
  const [deleteAll, setDeleteAll] = useState(false);

  const handleDeleteAll = () => {
    // window.confirm("HEY");
    setDeleteAll(true);
    // if (window.confirm("You want delete all?")) {
    //   setListTodo([]);
    // }
  };
  const handleClosePopupDeleteAll = () => {
    setDeleteAll(false);
  };
  const handleDeleteAllClose = () => {
    setDeleteAll(false);
  };
  const handleDeleteAllOk = () => {
    setListTodo([]);
    setDeleteAll(false);
  };

  //Close popup
  const handleClose = () => {
    //Close Popup
    setDeletepopUp(false);
  };

  const handleCheck = (id, e) => {
    const checkIP = e.target.checked;
    const cloneListToDo = [...listTodo];
    if (checkIP) {
      const clone = cloneListToDo.map((item) => {
        if (item.id === id) {
          return { ...item, check: true };
        } else {
          return { ...item };
        }
      });

      setListTodo(clone);
    } else if (!checkIP) {
      const clone = cloneListToDo.map((item) => {
        if (item.id === id) {
          return { ...item, check: false };
        } else {
          return { ...item };
        }
      });

      setListTodo(clone);
    }
  };
  const handleSelect = () => {
    // const e = document.getElementById("selectSort");
    // console.log(e.options[e.selectedIndex].value);

    const cloneListToDo = [...listTodo];
    cloneListToDo.reverse(function (a, b) {
      return a - b;
    });
    setListTodo(cloneListToDo);
  };
  return (
    <>
      <div className="today__hoursSet">
        {" "}
        <span
          className={`today__hours ${
            !changeBG ? "todayBoxBgWhite" : "todayBoxBgBlack"
          }`}
        >
          {hourTime.toLocaleTimeString()}
        </span>
      </div>
      <div className="today">
        <div className="today__content">
          {" "}
          <div className="today__time">
            {" "}
            <h1>
              Today <span className="today__date">{dateTime}</span>{" "}
            </h1>
          </div>
          <div className="today__sort">
            {/* Clear Text  */}
            {valueInput !== "" && (
              <button
                className="today__clearText"
                onClick={() => {
                  handleClearText();
                }}
              >
                X
              </button>
            )}
            {/* Sort */}
            {listTodo.length > 1 && (
              <div
                className="today__sort__icons"
                onClick={() => {
                  handleSelect();
                }}
              >
                <ImportExportIcon />
              </div>
            )}
          </div>
          <form className="today__form">
            <input
              id="inputToday"
              type="text"
              className={`${changeBG ? "today__input" : "today__inputWhite"}  `}
              onChange={(e) => {
                onChange(e);
              }}
            />

            {valueInput !== "" && (
              <button
                type="submit"
                onClick={(e) => {
                  handleListToDo(e);
                }}
                className={` ${
                  changeBG ? "today__button" : "today__buttonWhite"
                }`}
              >
                Submit
              </button>
            )}
            {listTodo?.length > 1 && (
              <>
                {" "}
                <div
                  className="deleteALL"
                  onClick={() => {
                    handleDeleteAll();
                  }}
                >
                  <ClearAllIcon />
                </div>
              </>
            )}
          </form>
          <div className="today__listToDo">
            {listTodo?.length > 0 && (
              <React.Fragment>
                {listTodo?.map((item) => (
                  <div key={item.id} className="today__listToDo__content">
                    <div className="today__listToDo__text">
                      <span className="today__listToDo__values">
                        <input
                          className="checkIP"
                          type="checkbox"
                          onClick={(e) => {
                            handleCheck(item.id, e);
                          }}
                        />

                        {item.check ? (
                          <del style={{ color: "red" }}>{item.values}</del>
                        ) : (
                          item.values
                        )}
                      </span>
                    </div>
                    <div className="today__listToDo__icons">
                      {" "}
                      <DeleteForeverIcon
                        className={`${item.check ? "fadeIcons" : ""}`}
                        onClick={() => {
                          handleDeleteItem(item.id, item.values);
                        }}
                      />
                      <EditIcon
                        className={`${item.check ? "fadeIcons " : ""}`}
                        onClick={() => {
                          handleEditItem(item.id, item.values);
                        }}
                      />
                    </div>
                    {/* Begin popup delete 1 item */}
                    {deletepopUp && (
                      <div className="popupDelete">
                        <div className="popupDelte__content">
                          <div className="popupDelete__iconsClose">
                            <CloseIcon
                              onClick={() => {
                                handleClose();
                              }}
                            />
                          </div>
                          <div className="popupDelete__detail">
                            <div className="popupDelete__iconsSmile">
                              {" "}
                              <InsertEmoticonIcon />
                            </div>

                            <h3 className="popupDelete__hello">Hello</h3>
                            <p className="popupDelete__textSureDelete">
                              Are you sure you want to delete?
                            </p>
                            <div className="popupDelte__button">
                              <button
                                className="popupDelete__buttonOK buttonTg"
                                onClick={() => {
                                  handleCheckDelete();
                                }}
                              >
                                OK
                              </button>
                              <button
                                className="popupDelete__buttonClose buttonTg"
                                onClick={() => {
                                  handleClose();
                                }}
                              >
                                CLOSE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* End Popup Check Delete */}
                    {/* Edit Popup */}
                    {edit && (
                      <div className="popupDelete">
                        <div className="popupDelte__content">
                          <div className="popupDelete__iconsClose">
                            <CloseIcon
                              onClick={() => {
                                handleCloseEdit();
                              }}
                            />
                          </div>
                          <div className="popupDelete__detail">
                            <div className="popupDelete__iconsSmile">
                              {" "}
                              <InsertEmoticonIcon />
                            </div>

                            <h3 className="popupDelete__hello">Hello</h3>
                            <p className="popupDelete__textSureDelete">
                              Are you sure you want to edit?
                            </p>
                            <p style={{ color: "red" }}>{editID.values}</p>
                            <input
                              type="text"
                              className="popupInputEdit"
                              onChange={(e) => {
                                onChangeEdit(e);
                              }}
                            />
                            <div className="popupDelte__button">
                              {inputEdit !== "" && (
                                <button
                                  className="popupDelete__buttonOK buttonTg"
                                  onClick={() => {
                                    handleEditOk();
                                  }}
                                >
                                  OK
                                </button>
                              )}

                              <button
                                className="popupDelete__buttonClose buttonTg"
                                onClick={() => {
                                  handleCloseEdit();
                                }}
                              >
                                CLOSE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* end Edit popup */}
                    {/* Begin popup delete ALL */}
                    {deleteAll && (
                      <div className="popupDelete">
                        <div className="popupDelte__content">
                          <div className="popupDelete__iconsClose">
                            <CloseIcon
                              onClick={() => {
                                handleClosePopupDeleteAll();
                              }}
                            />
                          </div>
                          <div className="popupDelete__detail">
                            <div className="popupDelete__iconsSmile">
                              {" "}
                              <InsertEmoticonIcon />
                            </div>

                            <h3 className="popupDelete__hello">Hello</h3>
                            <p className="popupDelete__textSureDelete">
                              Are you sure you want to delete all?
                            </p>
                            <div className="popupDelte__button">
                              <button
                                className="popupDelete__buttonOK buttonTg"
                                onClick={() => {
                                  handleDeleteAllOk();
                                }}
                              >
                                OK
                              </button>
                              <button
                                className="popupDelete__buttonClose buttonTg"
                                onClick={() => {
                                  handleDeleteAllClose();
                                }}
                              >
                                CLOSE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* End Popup Check Delete All */}
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Today;
