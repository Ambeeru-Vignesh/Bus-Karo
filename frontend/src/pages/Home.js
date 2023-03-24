import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      console.log("not logged in");
      navigate("/login");
    }
  }, [navigate, user]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <DefaultLayout>
        {user ? (
          <>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <Button onClick={logoutHandler}> LOGOUT</Button>
          </>
        ) : (
          <h1>hello</h1>
        )}
      </DefaultLayout>
    </>
  );
};

export default Home;
