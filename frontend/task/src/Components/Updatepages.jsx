import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import validationSchema from "./Validation";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: "",
    gender: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getuserbyid/${id}`
        );
        const userdata = response.data;

        setUserData(userdata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateuser/${id}`,
        userData
      );

      const updatedUser = response.data;
      console.log("updatedUser", updatedUser);

      toast.success("User updated successfully!");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user.");
    }
  };
  const handlechange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const cancelHandle = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-3 w-50 shadow py-3 round">
        <h3 className="text-center">Update User</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullname">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={handlechange}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender:</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={userData.gender}
              onChange={handlechange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handlechange}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Update
          </Button>
          <Button className="mt-2" variant="primary" onClick={cancelHandle}>
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateUser;
