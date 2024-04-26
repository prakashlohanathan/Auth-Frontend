import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../container/routes';
import { Button } from "@mui/material";

const Dashboard = () => {
  let navigate=useNavigate();
  let [user,setUser]=useState("")
  useEffect(()=>{
    let token=localStorage.getItem("token");
    if(!token){
      navigate('/login');
    }
    async function fetchData(){
      let data=await getUser(token);
      setUser(data);
    }
    fetchData();
  },[])

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {user && (
        <div>
          <h1>Welcome {user.name}</h1>
          <h4>{user.email}</h4>
          <div className="btn-logout">
          <Button onClick={handleLogout} variant="contained" type="submit">
          Logout
          </Button></div>
        </div>
      )

      }
      
    </div>
  )
}

export default Dashboard;