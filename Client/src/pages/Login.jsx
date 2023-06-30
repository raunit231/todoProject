import React from 'react'
import "./Login.css"

function Login() {
  
  return (
    <div className="login__container">
      <div className="login__container_2">
        <img className='my-2 object-contain' src={require("../assets/logo.png")} alt="" />
        <form className='login__form space-y-3' action="">
          <input className='' placeholder='Email' type="email" />
          <input className='' placeholder='Password' type="password" />
          <button type='submit'>Log in</button>
        </form>
        
        <p className='my-3'>Forgot Password?</p>
      </div>
    </div>
  )
}

export default Login