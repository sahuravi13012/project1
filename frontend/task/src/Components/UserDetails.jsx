// UserDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  console.log("id");
  const [user, setUser] = useState(null);
  console.log("user", user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getuserbyid/${id}`
        );
        console.log("response", response);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Full Name: {user.fullname}</p>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Status: {user.status}</p>
      <img
        src={`http://localhost:5000/uploads/${user.profile}`}
        alt="Profile"
      />
    </div>
  );
};

export default UserDetails;
