import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../resources/auth.css";
import { login, reset } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message: userMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(userMessage);
    }
    if (user) {
      navigate("/");
      if (isSuccess) {
        message.success("User Logged in Successfully");
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, userMessage, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="h-screen d-flex justify-content-center align-items-center auth">
        <div className="w-400 card p-3">
          <h1 className="text-lg">
            Bus Karo - Login{" "}
            <i className="fa-sharp fa-solid fa-van-shuttle"></i>
          </h1>
          <hr />
          <Form onSubmit={submitHandler}>
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
            <div className="d-flex justify-content-between align-items-center my-3">
              <Link to="/register">Click Here To Register</Link>
              <Button className="secondary-btn" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
