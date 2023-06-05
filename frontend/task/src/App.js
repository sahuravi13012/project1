import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserList from "./Components/UserList";
import AddUser from "./Components/AddUser";
import Updatepages from "./Components/Updatepages";
import UserDetails from "./Components/UserDetails";
import Sanjiv from "./Components/Sanjiv";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/update/:id" element={<Updatepages />} />
        <Route path="/userdetails/:id" element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;
