import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../resources/auth.css";
import { register, reset } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isSuccess) {
      message.success(
        `${
          user.name.charAt(0).toUpperCase() + user.name.slice(1)
        } credentials created successfully`
      );
      navigate("/login");
    }
    if (isError) {
      message.error("User already exists");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="h-screen d-flex justify-content-center align-items-center auth">
        <div className="w-400 card p-3">
          <h1 className="text-lg">
            Bus Karo - Register{" "}
            <i className="fa-sharp fa-solid fa-van-shuttle"></i>
          </h1>
          <hr />
          <Form onSubmit={submitHandler}>
            <Form.Group className="input" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group className="input" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group className="input" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center my-3">
              <Link to="/login">
                <h6>Click Here To Login</h6>
              </Link>
              <Button className="secondary-btn" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
