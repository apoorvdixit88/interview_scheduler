import React, { useState, useEffect } from "react";
import { users, createInt } from "../../utilities/url";
import axios from "axios";
import { Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

const CreateInterview = () => {
  const [loading, setLoading] = useState(true);
  const [emailsList, setEmails] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [usersList, setUserList] = useState([]);

  useEffect(async () => {
    try {
      const AxiosInstance = axios.create({ baseURL: users });
      const getUsers = await AxiosInstance.get();
      setLoading(false);
      setUserList(getUsers.data);
    } catch (e) {
      console.log("error");
    }
  }, []);

  const check = (email) => {
    return emailsList.includes(email);
  };

  const addEmail = (email) => {
    const dummylist = [...emailsList];
    dummylist.push(email);
    setEmails(dummylist);
  };

  const removeEmail = (email) => {
    const dummylist = emailsList.filter((item) => item != email);
    setEmails(dummylist);
  };
  const submit = async () => {
    try {
      if (startTime > endTime)
        return alert("Start time must be before end time");
      const UsersList = usersList.filter((item) =>
        emailsList.includes(item.email)
      );
      let request = {
        user: UsersList,
        startTime: startTime.getTime().toString(),
        endTime: endTime.getTime().toString(),
      };
      const response = await axios.post(createInt, request);
      const dummy = [];
      const start = new Date();
      const end = new Date();
      setEmails(dummy);
      setStartTime(start);
      setEndTime(end);
      alert("Interview was successfully created");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return loading ? (
    <div className="fs-3">Loading...Please wait.</div>
  ) : (
    <>
      <div>
        <h1 className="fs-1 mt-2 fw-bolder" style={{ color: "#609191" }}>
          {" "}
          Create new Interview
        </h1>
      </div>
      <div className="container row " style={{ margin: "6rem" }}>
        <div className="col d-grid justify-content-center">
          <h3 className="fs-2" style={{ color: "#525252" }}>
            Add Users
          </h3>
          {usersList.map((item, index) => (
            <p key={index}>
              <span style={{ fontFamily: "verdana" }}>{item.email}</span> &nbsp;
              {!check(item.email) && (
                <Button
                  className="bg-primary text-white"
                  variant="outlined"
                  onClick={() => {
                    addEmail(item.email);
                  }}
                >
                  ADD
                </Button>
              )}
              {check(item.email) && (
                <Button
                  className="bg-danger text-white"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    removeEmail(item.email);
                  }}
                >
                  REMOVE
                </Button>
              )}
            </p>
          ))}
        </div>
        <div className="col container1">
          <h3 className="fs-2" style={{ color: "#525252" }}>
            Select Time
          </h3>
          <p className="fw-bolder" style={{ fontSize: "1rem" }}>
            Start Time:-
          </p>
          {<DateTimePicker onChange={setStartTime} value={startTime} />} <br />
          <p className="fw-bolder m-2" style={{ fontSize: "1rem" }}>
            End Time:-
          </p>
          {<DateTimePicker onChange={setEndTime} value={endTime} />} <br />
          <br />
          <Button
            className="bg-success text-white"
            variant="contained"
            color="primary"
            onClick={() => submit()}
          >
            Create Interview
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateInterview;
