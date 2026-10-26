import { useState } from "react";
import { Button, Form, FormCheck, Tab, Tabs} from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { handleLogin } from "../../auth/auth";

export default function FormLogin() {
  const navigate = useNavigate();
  const [ setError] = useState("");
  const [ setErrors] = useState({});
  const toForgotPassword = () => {
    navigate("/forgot_password");
  };
  const toProfile = () => {
    navigate("/profile");
  };
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setError("");
    console.log("Form submitted:", data);
    try {
      await handleLogin(data.email, data.password);
      // After successful login, navigate to the profile page
      
      toProfile();
    } catch (error) {
    
      console.error(error);
      if(error.response?.status === 422) {
        const responseData = await error.response.json();
        setErrors(responseData.errors ?? {});
        return;
      } 

      setError(error.message || "An error occurred during login.");
    }
  };
  return (
    <>
      <Tabs className="login mb-3" defaultActiveKey="login" fill>
        <Tab eventKey="login" title="Login">
          <Form className="login_form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>
            <div className="check_forgot">
              <FormCheck label="Remember for 30 days" />
              <Link className="forgot_password" onClick={toForgotPassword}>
                Forgot Password
              </Link>
            </div>
            <Button className="btn-success my-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form className="login_form">
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Confirm Password"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
            </Form.Group>
            <Button className="btn-success my-3" type="submit">
              Sign In
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </>
  );
}
