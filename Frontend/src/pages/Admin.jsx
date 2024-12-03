import React, { useState } from "react";
import AdminPanel from "../components/AdminPanel";
import AddnewReservation from '../components/AddnewReservation';
// import AdminLogin from "../components/AdminLogin";

const Admin = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  return (
    <>
    <AddnewReservation/>
    <AdminPanel/>
    </>
  )
    
};

export default Admin;
