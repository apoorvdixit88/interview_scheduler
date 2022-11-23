import React, { useState, useEffect } from "react";
import { interviews } from "../../utilities/url";
import axios from "axios";
import Interview from "../interview/interview";
import {Container,Row} from 'react-bootstrap';


const ViewInterview = () => {
  const [loading, setLoading] = useState(true);
  const [items, loadItems] = useState([]);

  useEffect(async () => {
    try {
      const AxiosInstance = axios.create({ baseURL: interviews });
      const interviewsList = await AxiosInstance.get();
      setLoading(false);
      loadItems(interviewsList.data);
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  return loading ? (
    <div className="fs-3">Loading...Please wait</div>
  ) : (
    <Container className="container p-4">
    
    <Row xs={1} md={3}>
      {items.map((item, index) => (
        <Interview key={index} item={item} />
      ))}
    </Row>
    </Container>
  );
};

export default ViewInterview;
