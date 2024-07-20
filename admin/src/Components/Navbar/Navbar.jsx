import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  }

  return (
    <div className="navbar">
      <img onClick={handleNavigate} className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar