import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Sign In</h1>
      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' required />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' required />
          </Form.Group>
        </Row>
        <div className='mb-3'>
          <Button type='submit'>Sign In</Button>
        </div>
        <div className='mb-3'>
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
export default SignInScreen;
