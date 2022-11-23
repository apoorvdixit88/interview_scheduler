import React, { useState, useEffect } from "react";
import Interview from "../interview/interview";
import { users, interviews, updateInterview } from "../../utilities/url";
import axios from "axios";
import { Button, Col, Row, Container } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

const UpdateInterview = () => {
  const [loading, setLoading] = useState(true);
  const [emailsList, setEmails] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [usersList, setUserList] = useState([]);
  const [boolUpdate, setUpdate] = useState(true);
  const [interviewList, setInterviewList] = useState([]);
  const [Edit, setEditState] = useState();
  const [savedItem, setSavedItem] = useState(null)
  useEffect(async () => {
    try {
      const AxiosInstance = axios.create({ baseURL: users });
      const getUsers = await AxiosInstance.get();
      const AxiosInstance1 = axios.create({ baseURL: interviews });
      const getInterviews = await AxiosInstance1.get();
      setLoading(false);
      setUserList(getUsers.data);
      setInterviewList(getInterviews.data);
    } catch (e) {
      console.log("error");
    }
  }, [boolUpdate]);

  const checkEditState = (item) => {
    return Edit !== item;
  };

  const checkUser = (email) => {
    return emailsList.includes(email);
  };

  const unClickCheck = (item) => {
    setEmails(item.email);
    setStartTime(new Date(parseInt(item.startTime)));
    setEndTime(new Date(parseInt(item.endTime)));
    setEditState(item);
  };

  const clickCheck = (item) => {
    setEmails([]);
    setStartTime(new Date());
    setEndTime(new Date());
    setEditState(null);
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
  
  const clickfunc = (item) => {
   setSavedItem(item);
   unClickCheck(item)

  };
  const updateCall = async () => {
    try {
      if (startTime > endTime)
        return alert("Start time must be before end time");
      const UsersList = usersList.filter((item) =>
        emailsList.includes(item.email)
      );
      let request = {
        interviewId: Edit._id,
        user: UsersList,
        startTime: startTime.getTime().toString(),
        endTime: endTime.getTime().toString(),
      };
      const response = await axios.patch(updateInterview, request);
      const dummy = !boolUpdate;
      setUpdate(dummy);
      alert("Interview was successfully updated");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return loading ? (
    <div>Loading...Please wait.</div>
  ) : (
    <div>
      <h1 className="fs-1 mt-2 fw-bolder" style={{ color: "#609191" }}>
        Edit Scheduled Interviews
      </h1>

              {checkEditState(savedItem) && (
                
        <Container>
        <Row xs={1} md={3}>
          {interviewList.map((item) => (
                  <div class="bootstrap snippets bootdeys">
                    <Col>
                      <div class="card-big-shadow">
                        <div
                          class="card card-just-text"
                          data-background="color"
                          data-color="blue"
                          data-radius="none"
                        >
                          <div class="content">
                            <h4 class="title">{}</h4>
                            <div class="btn-group">
                              <button
                                type="button"
                                class="btn btn-secondary dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Users
                              </button>
                              <div class="dropdown-menu dropdown-menu-right dropdown-toggle">
                                <button class="dropdown-item" type="button">
                                  Action
                                </button>
                                <button class="dropdown-item" type="button">
                                  Another action
                                </button>
                                <button class="dropdown-item" type="button">
                                  Something else here
                                </button>
                              </div>
                            </div>
                            {item.email.map((email, index) => (
                              <div>
                                <h6 class="category">{email}</h6>
                              </div>
                            ))}

                            <h3>Start Time: {item.startTime}</h3>
                            <h3>EndTime: {item.endTime}</h3>
                            <Button
                              className="bg-info text-dark"
                              variant="contained"
                              onClick={() => clickfunc(item)}
                            >
                              EDIT
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
          ))}
          
          </Row>
          </Container>
          
                
              )}
              {!checkEditState(savedItem) && (
                <div>
                  <Button
                    className="bg-secondary text-white"
                    variant="contained"
                    color="brown"
                    onClick={() => clickCheck(savedItem)}
                  >
                    UNDO
                  </Button>
                  <div className="container row " style={{ margin: "6rem" }}>
                    <div className="col">
                      <h3 className="fs-2" style={{ color: "#525252" }}>
                        Users
                      </h3>
                      {usersList.map((item, index) => (
                        <p key={index}>
                          <span style={{ fontFamily: "verdana" }}>
                            {item.email}
                          </span>{" "}
                          &nbsp;
                          {!checkUser(item.email) && (
                            <Button
                              className="bg-primary text-white"
                              variant="outlined"
                              color="primary"
                              onClick={() => addEmail(item.email)}
                            >
                              ADD
                            </Button>
                          )}
                          {checkUser(item.email) && (
                            <Button
                              className="bg-danger text-white"
                              variant="outlined"
                              color="secondary"
                              onClick={() => removeEmail(item.email)}
                            >
                              REMOVE
                            </Button>
                          )}
                        </p>
                      ))}
                    </div>

                    <div className="col">
                      <h3 className="fs-2" style={{ color: "#525252" }}>
                        Select Time
                      </h3>
                      <p style={{ fontSize: "1rem" }}>Start Time:-</p>
                      {
                        <DateTimePicker
                          onChange={setStartTime}
                          value={startTime}
                        />
                      }{" "}
                      <br />
                      <p style={{ fontSize: "1rem" }}>End Time:-</p>
                      {
                        <DateTimePicker onChange={setEndTime} value={endTime} />
                      }{" "}
                      <br />
                    </div>
                  </div>
                  <br />
                  <Button
                    className="bg-success text-white"
                    variant="contained"
                    color="primary"
                    onClick={() => updateCall()}
                  >
                    UPDATE
                  </Button>{" "}
                  &nbsp;
                  {/* <Button
                variant="contained"
                color="primary"
                onClick={() => deleteCall()}
              >
                DELETE
              </Button> */}
                </div>
              )}

              {/* <Interview key={index} item={item} /> */}
    
          
    </div>
  );
};

export default UpdateInterview;
