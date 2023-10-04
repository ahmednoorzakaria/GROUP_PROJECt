import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';


function SignupForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Adding confirmPassword field for signup
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match") // Password confirmation should match the password field
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Signing up with:", values);
      // You can add your signup logic here, e.g., send the data to a server.
    }, 1000);
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Sign up</div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Username field */}
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Email field */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Password field */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Confirm Password field */}
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm your password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                  </Form>
                )}
              </Formik>
              {}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default SignupForm;