/* TODO - add your code to create a functional React component that renders a registration form */
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"


function Register({setToken}) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        {
          firstname: firstName,  // API expects "firstname"
          lastname: lastName,    // API expects "lastname"
          email: email,
          password: password
        },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log("Token:", response.data.token);
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        alert ("Registration Successful")
        navigate("/Books");
      }
    } catch (err) {
      console.error("Error response:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  }
  
  return (
    <>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
        <label>
            First Name: <input type="text" name = "firstName" value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </label>
        <label>
            Last Name: <input type="text" name = "lastName" value = {lastName} onChange = {(e) => setLastName(e.target.value)}/>
        </label>
        <label>
            Email: <input type="email" name = "email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
        </label>
        <label>
            Password: <input type="password" name = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
        </label>
        <button>Submit</button>
    </form>
    {error && <p>{error}</p>}
</>
  )
}

export default Register