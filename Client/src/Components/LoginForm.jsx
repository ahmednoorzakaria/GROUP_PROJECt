import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle the response from the backend
      if (response.ok) {
        // Successful login
        const data = await response.json();
        setMessage(data.message);
        setError("");
      } else {
        // Error occurred
        const errorData = await response.json();
        setError(errorData.message);
        setMessage("");
      }
    } catch (error) {
      // Handle any network or other errors
      setError("An error occurred. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;