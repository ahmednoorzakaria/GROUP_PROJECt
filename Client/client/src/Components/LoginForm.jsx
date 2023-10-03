import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';


function LoginForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Logging in with:", values);
    
    }, 1000);
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Log in</div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
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

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="mt-3">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
              <div className="mt-3">
                      {/* Social media login buttons with Font Awesome icons */}
                      <button className="btn btn-danger me-2">
                        <FaGoogle /> 
                      </button>
                      <button className="btn btn-primary me-2">
                        <FaFacebook /> 
                      </button>
                      <button className="btn btn-info me-2">
                        <FaLinkedin /> 
                      </button>
                      <button className="btn btn-secondary me-2">
                        <FaInstagram /> 
                      </button>
                    </div>
                  
              {/* ... (unchanged "Forgot Password?" link) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;