import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="home__container">
      <div className="home__container_2">
        <img className='my-2 object-contain' src={require("../assets/logo.png")} alt="" />
        <h1>ToDo</h1>
        <p className='my-2'>Now plan your day with us.</p>
        <Link to="/login">
          <div className='home__container_2_login my-2'><p>Log in</p></div>
        </Link>
        <Link to="/signup">
          <div className='home__container_2_signup'><p>Sign Up</p></div>
        </Link>
      </div>
    </div>
  )
}

export default Login