import React from "react";
import { Col, Button } from "react-bootstrap";

const Interview = ({ item }) => {
  const tempDate = new Date(parseInt(item.startTime)).toDateString();
  const date=tempDate.substring(3,tempDate.length);
  const startDate = new Date(parseInt(item.startTime)).toLocaleDateString('en-IN');
  const endDate = new Date(parseInt(item.endTime)).toLocaleDateString('en-IN');
  const startTime = new Date(parseInt(item.startTime)).toLocaleTimeString(
    "en-IN",
    { hour12: false, hour: "numeric", minute: "numeric" }
  );
  const endTime = new Date(parseInt(item.endTime)).toLocaleTimeString("en-IN", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <div class="bootstrap snippets bootdeys p-3" >
        <Col>
          <div class="card-big-shadow">
            <div
              class="card card-just-text"
              data-background="color"
              data-color="blue"
              data-radius="none"
            >
              <div class="content">
                <h4 class="title">{date}</h4>
                <div class="dropdown ">
                  <button
                    class="btn btn-secondary  dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Users
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {item.email.map((email, index) => (
                      <div>
                        <div class="dropdown-item">{email}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3>Start Time: {startTime} </h3><p>{startDate}</p>
                <h3>EndTime: <br/> {endTime}</h3> <p>{endDate}</p>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};
export default Interview;
