import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.username || !formData.email || !formData.password) {
        setError("All fields are required.");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create user.");
        return;
      }

      // Clear form data and errors on success
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
      console.log("User created successfully.");
    } catch (error) {
      console.error("Error creating user:", error.message);
      setError("An error occurred while creating the user.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Sign up</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
