import { Button, Form, FormCheck, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate } from "react-router";

export default function FormLogin() {
    const navigate = useNavigate()
    const toForgotPassword = ()=>{
        navigate("/forgot_password");
    }
  return (
    <>
      <Tabs className="login mb-3" defaultActiveKey="login" fill>
        <Tab eventKey="login" title="login">
          <Form className="login_form">
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your Password" />
            </Form.Group>
            <div className="check_forgot">
              <FormCheck label="Remember for 30 days" />
              <Link className="forgot_password" onClick={toForgotPassword} >Forgot Password</Link>
            </div>
            <Button className="btn-success my-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="register">
          <Form className="login_form">
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your Confrim Password" />
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
