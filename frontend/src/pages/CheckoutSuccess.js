import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import { payment } from "../redux/bookings/bookingSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const userInfo = localStorage.getItem("user");
  const busId = JSON.parse(localStorage.getItem("busId"));
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const session_id = searchParams.get("session_id");

  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (!userInfo || !user) {
      console.log("not logged in");
      navigate("/login");
    } else {
      const sessionId = new URLSearchParams(location.search).get("session_id");
      if (sessionId) {
        console.log("Payment successful for session ID:", sessionId);
        message.success(
          "Payment Done. You're seats are booking, Please wait...."
        );
        setAccess(true);
        dispatch(payment());
        navigate(`/book-now/${busId}`);
      }
    }
  }, [navigate, dispatch, userInfo, user, session_id, location.search]);

  return (
    <div>
      {access ? (
        <h1>
          <Loader />
        </h1>
      ) : (
        <h1>No Access!!!</h1>
        //Add link to home page
      )}
    </div>
  );
};

export default CheckoutSuccess;
