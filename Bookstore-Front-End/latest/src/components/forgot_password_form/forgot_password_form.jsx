import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ForgotPasswordForm() {
    const navigate = useNavigate();
    const back = () =>{
        navigate("/login")
    }
  return (
    <>
      <Form className="login_form">
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="text" placeholder="name@example.com" />
        </Form.Group>
        <Button className="btn-success my-3" type="submit">
          Send Reset Link
        </Button>
        <Button className="btn-light my-3" onClick={back}>
          Back
        </Button>
      </Form>
    </>
  );
}
