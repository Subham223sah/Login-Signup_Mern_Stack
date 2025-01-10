import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handelError, handelSuccess } from "../Utilities/Utiliti";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(""); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const { name, email, password } = formData

        // if (!name || !email || !password) {
        //     return handelError('Name , Email, Password are required!')
        // }
        try {
            const url = "http://localhost:8001/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log("Backend Response:", result);

            const { success, message, jwtToken , name ,error } = result;

            if (success) {
                handelSuccess(message);
                localStorage.setItem("token", jwtToken);
                console.log("Token:", jwtToken);
                localStorage.setItem("loggedInUser", name);
                console.log("Logged-in User:", name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message ;
                handelError(details);
            } else if (!success) {
                handelError(message)
            }
            console.log(result);
        } catch (err) {
            handelError(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow" style={{ width: "400px", borderRadius: "15px" }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Login </h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <p className="text-danger">{error}</p>}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">
                                Login 
                            </button>
                        </div>

                        <p className="text-center mt-3">
                            Don't have an account?
                            <Link to="/signup" className="btn btn-primary btn-default border w-100 bg-dark rounded text-decoration-none">
                                Signup here
                            </Link>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;
