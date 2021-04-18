import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginApi } from "../../api/LoginApi";
import useInput from "../../hooks/useInput";

const LoginForm = () => {
  const [formError, setFormError] = useState("");

  const [email, bindEmail, resetEmail, emailError, setEmailError] = useInput(
    ""
  );
  const [
    password,
    bindPassword,
    resetPassword,
    passwordError,
    setPasswordError,
  ] = useInput("");
  const [role, bindRole, resetRole, roleError, setRoleError] = useInput("User");

  const onSubmit = async (e) => {
    e.preventDefault();

    const [error, result] = await loginApi(email, role, password);

    if (error) {
      const errorData = error.response.data.content;

      setEmailError("");
      setRoleError("");
      setPasswordError("");

      switch (errorData.errorCode) {
        case 0:
          setFormError(`Missing : ${errorData.message.join(", ")}`);
          break;
        case 1:
        case 2:
          setFormError(errorData.message);
          break;
        case 4:
          setEmailError(errorData.message);
          break;
        case 5:
          setRoleError(errorData.message);
          break;
        case 6:
          setPasswordError(errorData.message);
          break;
        default:
          setFormError("Error while submitting");
          break;
      }
    } else {
      console.log(result);

      setEmailError("");
      setRoleError("");
      setPasswordError("");
      
      resetEmail();
      resetPassword();
      resetRole();
    }
  };

  return (
    <Form onSubmit={onSubmit} className="p-4 border shadow bg-white">
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...bindEmail}
          required
        />
        <Form.Text className="text-color-accent">{emailError}</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" {...bindRole} required>
          <option>User</option>
          <option>Admin</option>
        </Form.Control>
        <Form.Text className="text-color-accent">{roleError}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...bindPassword}
          required
        />
        <Form.Text className="text-color-accent">{passwordError}</Form.Text>
      </Form.Group>

      <Form.Group className="text-center">
        <Form.Text className="text-color-accent">{formError}</Form.Text>
      </Form.Group>

      <div className="text-center">
        <Button variant="color-major" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
