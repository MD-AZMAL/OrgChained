import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const HomePage = () => {
  return (
    <PageWrapper>
      <div className="p-5">
        <div className="text-center mb-5">
          <h2 className="text-color-major bold">Let's get started now!</h2>
          <p className="text-muted">
            Or <Link to="/register">Create Account</Link> if not registered yet
          </p>
        </div>

        <div className="w-50 mx-auto">
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
