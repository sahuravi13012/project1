import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Table, DropdownButton, Dropdown, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    const apiData = await axios.get("http://localhost:5000/api/getuser");
    console.log("apiData", apiData);
    setUsers(apiData.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    console.log("newStatus", newStatus);
    try {
      await axios.put(`http://localhost:5000/api/updateuserstatus/${userId}`, {
        status: newStatus,
      });
      // Update the user's status locally in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getQuery = async (query = "") => {
    try {
      const apiQueryData = await axios.get(
        `http://localhost:5000/api/serach?search=${query}`
      );

      if (apiQueryData.data.response.length === 0) {
        // Show a toast message indicating that no users were found
        toast.info("No users found.");
      }

      setUsers(apiQueryData.data.response);
    } catch (error) {
      console.log(error);
      // Show an error toast message
      toast.error("Failed to fetch users.");
    }
  };
  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  const handleSearch = () => {
    getQuery(searchQuery);
  };
  const deletehandle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteuser/${id}`);
      // Show success toast message
      toast.success("User deleted successfully!");
      // Refresh the user list
      getData();
    } catch (error) {
      console.log(error);
      // Show error toast message
      toast.error("Failed to delete user.");
    }
  };
  const viewPage = (id) => {
    navigate(`/userdetails/${id}`);
  };
  const updatePage = (id) => {
    navigate(`/update/${id}`);
  };
  const handleCsv = async (id) => {
    try {
      await axios.get(`http://localhost:5000/api/export/csv`);
      // Show success toast message
      toast.success("CSV Download  successfully!");
      // Refresh the user list
      getData();
    } catch (error) {
      console.log(error);
      // Show error toast message
      toast.error("Failed to Download CSV.");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid mt-3">
        <h4 className="fw-bold">User List</h4>

        <div className="d-flex justify-content-between">
          <div>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <button
              type="button"
              size="sm"
              className="btn btn-danger mx-1"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div>
            <Link to="/adduser">
              <Button variant="danger  ms-2">Add User</Button>
            </Link>
            <Button variant="danger ms-2" onClick={handleCsv}>
              Export to Csv
            </Button>
          </div>
        </div>

        <Table striped bordered hover responsive="sm" className="mt-3">
          <thead>
            <tr className="custom-table-header bg-dark ">
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Profile</th>
              <th>Action</th>
              {/* <th>Export CV</th> */}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <DropdownButton
                      variant="danger"
                      size="sm"
                      id={`status-dropdown-${user._id}`}
                      title={user.status}
                    >
                      <Dropdown.Item
                        onClick={() => handleStatusChange(user._id, "Active")}
                      >
                        Active
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(user._id, "Inactive")}
                      >
                        Inactive
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td>
                    <Image
                      src={`http://localhost:5000/uploads/${user.profile}`}
                      roundedCircle
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id={`dropdown-${user._id}`}
                        className="custom-dropdown-toggle"
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => updatePage(user._id)}>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="mx-1"
                          />
                          Edit
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => viewPage(user._id)}>
                          <FontAwesomeIcon icon={faEye} className="mx-1" />
                          View
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => deletehandle(user._id)}>
                          <FontAwesomeIcon icon={faTrash} className="mx-1" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  {/* <td>
                    <Button
                      variant="danger ms-2"
                      onClick={() => handleCsv(user._id)}
                    >
                      Export to Csv 
                    </Button>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserList;
