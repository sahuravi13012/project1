import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    profile: "",
    email: "",
  });
  const [profile, setProfile] = useState("");

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("profile", profile);
      formDataToSend.append("email", formData.email);

      let configdata = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const postData = await axios.post(
        `http://localhost:5000/api/adduser`,
        formDataToSend,
        configdata
      );
      console.log("postData", postData);

      toast.success("User added successfully!");
      navigate("/");

      setFormData({
        fullname: "",
        gender: "",
        profile: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add user.");
    }
  };
  const cancelButton = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container mt-3 w-50 shadow py-3 round">
        <h3 className="text-center">Add User</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullname">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender:</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="profilephoto">
            <Form.Label>Profile Photo:</Form.Label>
            <Form.Control
              type="file"
              name="profile"
              accept="image/*"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Submit
          </Button>
          <Button className="mt-2" variant="primary" onClick={cancelButton}>
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddUser;
