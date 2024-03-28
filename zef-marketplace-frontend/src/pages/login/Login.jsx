import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;

    if (event.currentTarget.checkValidity() === true && email && password) {
      console.log(email, password);
    }

    setValidated(true);
  };
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-md-center align-items-center mt-5 fw-bold fs-5">
        <Col xs={12} md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="my-2"
                placeholder="Email"
                name="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="my-2"
                placeholder="Password"
                name="password"
                required
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </FormGroup>
            <Button className="my-3 w-100" type="submit">
              Login
            </Button>
            <p className="text-center">
              You don't have account ? <Link to="/register">Register</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
