import React,{ useState, useEffect} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import axios from 'axios'

function ProtectedRoute() {
    const [error, setError] = useState(null);
    const getToken = () => localStorage.getItem("token");
  return (
    <>
      {getToken() ? <Outlet/> : <Navigate to = "/Login"/>}
    </> 
)
}

export default ProtectedRoute