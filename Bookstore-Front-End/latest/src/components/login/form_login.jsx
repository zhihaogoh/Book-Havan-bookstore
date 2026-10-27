import { useState } from "react";
import { Button, Form, FormCheck, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { handleLogin, handleRegister } from "../../auth/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function FormLogin() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState({});
  const [registerError, setRegisterError] = useState({});
  // const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterCPassword, setShowRegisterCPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword((prevState) => !prevState);
  };
  const toggleConfrimPasswordVisibility = () => {
    setShowRegisterCPassword((prevState) => !prevState);
  };
  const toForgotPassword = () => {
    navigate("/forgot_password");
  };
  const toProfile = () => {
    navigate("/profile");
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoginError({});
    // setError("");
    try {
      console.log("start");
      await handleLogin(loginData.email, loginData.password);
      toProfile();
    } catch (error) {
      if (error.status === 422) {
        setLoginError(error.errors ?? {});
        return;
      }
      // setError(error.message || "An error occurred during login.");
    }
  };
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError({});
    try {
      await handleRegister(
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.password_confirmation,
      );
      navigate("/login");
    } catch (error) {
      if (error.status === 422) {
        setRegisterError(error.errors ?? {});
        return;
      }
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
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                isInvalid={!!loginError.email?.length}
              />
              <Form.Control.Feedback type="invalid">
                {loginError.email?.[0]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                isInvalid={!!loginError.password?.length}
              />
              <Button
                className="eye"
                variant="outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </Button>

              <Form.Control.Feedback type="invalid">
                {loginError.password?.[0]}
              </Form.Control.Feedback>
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
          <Form className="login_form" onSubmit={handleRegisterSubmit}>
            <Row>
              <Form.Group className="mb-3 col-6">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={data.first_name}
                  onChange={(e) =>
                    setData({ ...data, first_name: e.target.value })
                  }
                  isInvalid={!!registerError.first_name?.length}
                />
                <Form.Control.Feedback type="invalid">
                  {registerError.first_name?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={data.last_name}
                  onChange={(e) =>
                    setData({ ...data, last_name: e.target.value })
                  }
                  isInvalid={!!registerError.last_name?.length}
                />
                <Form.Control.Feedback type="invalid">
                  {registerError.last_name?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                isInvalid={!!registerError.email?.length}
              />
              <Form.Control.Feedback type="invalid">
                {registerError.email?.[0]}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="password"
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                isInvalid={!!registerError.password?.length}
              />
              <Button
                className="eye"
                variant="outline-secondary"
                type="button"
                onClick={toggleRegisterPasswordVisibility}
                aria-label={
                  showRegisterPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showRegisterPassword}
              >
                {showRegisterPassword ? <FiEye /> : <FiEyeOff />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {registerError.password?.[0]}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="password"
                type={showRegisterCPassword ? "text" : "password"}
                placeholder="Enter your Confirm Password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData({ ...data, password_confirmation: e.target.value })
                }
                isInvalid={!!registerError.password?.length}
              />
              <Button
                className="eye"
                variant="outline-secondary"
                type="button"
                onClick={toggleConfrimPasswordVisibility}
                aria-label={
                  showRegisterCPassword ? "Hide password" : "Show password"
                }
                aria-pressed={setShowRegisterCPassword}
              >
                {showRegisterCPassword ? <FiEye /> : <FiEyeOff />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {registerError.password?.[0]}
              </Form.Control.Feedback>
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
