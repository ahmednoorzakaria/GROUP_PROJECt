import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signup.css";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const toggleCard = () => {
    setIsSignUp(!isSignUp);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignup = () => {
    const data = userData;
  
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Success message from Flask
        if (data.message === 'User created successfully.') {
          // If sign-up is successful, automatically switch to sign-in
          toggleCard();
        }
      })
      .catch(error => {
        console.error(error.message); // Error message from Flask
      });
  };

  const handleSignIn = () => {
    const data = {
      username: userData.username,
      password: userData.password
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Success message from Flask
      })
      .catch(error => {
        console.error(error.message); // Error message from Flask
      });
  };

  return (
    <>
      <br />
      <br />
      <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
        <div className={`form sign-in ${isSignUp ? 'inactive' : ''}`}>
          <h2>Welcome</h2>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="button" className="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
        <div className={`sub-cont ${isSignUp ? 's--signup' : ''}`}>
          <div className="img">
            <div
              className={`img__text m--up ${isSignUp ? 'active' : ''}`}
              onClick={toggleCard}
            >
              <h3>Don't have an account? Please Sign up!</h3>
            </div>
            <div
              className={`img__text m--in ${isSignUp ? '' : 'active'}`}
              onClick={toggleCard}
            >
              <h3>If you already have an account, just sign in.</h3>
            </div>
            <div className="img__btn">
              <span
                className={`m--up ${isSignUp ? 'active' : ''}`}
                onClick={toggleCard}
              >
                Sign Up
              </span>
              <span
                className={`m--in ${isSignUp ? '' : 'active'}`}
                onClick={toggleCard}
              >
                Sign In
              </span>
            </div>
          </div>
          <div className={`form sign-up ${isSignUp ? 'active' : ''}`}>
            <h2>Create your Account</h2>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </label>
            <button type="button" className="submit" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;


