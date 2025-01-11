import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handelSuccess } from '../Utilities/Utiliti';

function Home() {

const [logginUser, setLoginUser] = useState(" ")

useEffect(()=>{
  setLoginUser(localStorage.getItem('loggedInUser'))
})

const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedInUser");
  handelSuccess('Account Logout Successfully!')
  setTimeout(() => {
    navigate("/login")
}, 1000)
  // Redirect to login page
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow" style={{ width: "400px", borderRadius: "15px" }}>
                <div className="card-body text-center">
                    <h2 className="mb-4">Welcome, {logginUser}</h2>
                    <button className="btn btn-danger w-100" onClick={handleLogout}>
                        Logout
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
  )
}

export default Home
