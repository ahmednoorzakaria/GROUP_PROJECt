import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    // Toggle between login and signup forms
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              {isLogin ? 'Log in' : 'Sign up'}
            </div>
            <div className="card-body">
              {isLogin ? <LoginForm /> : <SignupForm />}
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleForm}
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
