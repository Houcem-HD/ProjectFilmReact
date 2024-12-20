import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../plugins/axiosConfig'; // Import the configured axios
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from 'reactstrap';

const Login = () => {
  document.title = 'Login | App Name';

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please Enter Your Username'),
      password: Yup.string().required('Please Enter Your Password'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          '/api/Account/login', // No need to specify the base URL, it's already set in axiosConfig
          values
        );
        if (response.status === 200 && response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          navigate('/profile');
        } else {
          setError('Login failed. Please try again.');
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'An error occurred.');
        } else {
          setError('Unable to reach the server. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <CardBody>
              <h4>Login</h4>
              <Form onSubmit={validation.handleSubmit}>
                {error && <Alert color="danger">{error}</Alert>}
                <div className="mb-3">
                  <Label>Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={validation.values.username}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={!!(validation.touched.username && validation.errors.username)}
                  />
                  <FormFeedback>{validation.errors.username}</FormFeedback>
                </div>
                <div className="mb-3">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={validation.values.password}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={!!(validation.touched.password && validation.errors.password)}
                  />
                  <FormFeedback>{validation.errors.password}</FormFeedback>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
