import React from "react";
import { Form, Button } from "react-bootstrap";
import { signupApi } from "../../api/apicall";
import useForm from "../../hooks/useForm";

const RegisterForm = () => {
  const [
    value,
    handleChange,
    formError,
    handleError,
    clearValue,
    clearError,
  ] = useForm({ role: "User" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (value.password !== value.confirmPassword) {
      handleError("password", "Password mismatch");
    } else {
      const { firstName, lastName, email, idNo, role, password } = value;

      const [error, result] = await signupApi({
        firstName,
        lastName,
        email,
        idNo,
        role,
        password,
      });

      if (error) {
        const errorData = error?.response?.data?.content;

        clearError();

        switch (errorData?.errorCode) {
          case 0:
            handleError("form", `Missing : ${errorData.message.join(", ")}`);
            break;
          case 1:
          case 2:
            handleError("form", errorData.message);
            break;
          case 3:
            handleError("email", errorData.message);
            break;
          default:
            handleError("form", "Error while submitting");
            break;
        }
      } else {
        console.log(result);

        clearError();
        clearValue();
      }
    }
  };

  return (
    <Form onSubmit={onSubmit} className="p-4 border shadow bg-white">
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="name"
          name="firstName"
          placeholder="Enter First name"
          value={value.firstName || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent">
          {formError.firstName}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="name"
          name="lastName"
          placeholder="Enter Last name"
          value={value.lastName || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent">
          {formError.lastName}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={value.email || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent">{formError.email}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>ID no</Form.Label>
        <Form.Control
          type="name"
          name="idNo"
          placeholder="Enter ID Number"
          value={value.idNo || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent">{formError.idNo}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={value.role || "User"}
          onChange={handleChange}
          required
        >
          <option>User</option>
          <option>Admin</option>
        </Form.Control>
        <Form.Text className="text-color-accent">{formError.role}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={value.password || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent">
          {formError.password}
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="confirmPassword"
          value={value.confirmPassword || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent">
          {formError.confirmPassword}
        </Form.Text>
      </Form.Group>
      <Form.Group className="text-center">
        <Form.Text className="text-color-accent">{formError.form}</Form.Text>
      </Form.Group>
      <div className="text-center">
        <Button variant="color-major" type="submit" block>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
