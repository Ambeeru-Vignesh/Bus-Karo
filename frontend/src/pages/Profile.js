import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getMe, updateUserProfile } from "../redux/auth/authSlice";
import DefaultLayout from "../components/DefaultLayout";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, isLoading, isUpdateSuccess } = useSelector(
    (state) => state.auth
  );

  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (!userInfo || !user) {
      navigate("/login");
    } else {
      if (!user || !user.name || isUpdateSuccess) {
        dispatch(getMe());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, isUpdateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passsword do not match");
    } else {
      const values = { id: user._id, name, email, password };
      dispatch(updateUserProfile(values));
    }
  };

  return (
    <DefaultLayout>
      <Row>
        <Col md={10}>
          <h2>User Profile</h2>
          {isLoading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Button
              type="submit"
              className="secondary-btn text-md"
              variant="primary"
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default Profile;
