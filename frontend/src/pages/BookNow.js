import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, message } from "antd";
import Loader from "../components/Loader";
import { ListBusDetails, reset } from "../redux/buses/busSlice";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { Button } from "react-bootstrap";
import { bookingPayment, createBooking } from "../redux/bookings/bookingSlice";
import getStripe from "../components/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const BookNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const { user, isError } = useSelector((state) => state.auth);
  const { bus, isSuccess, isLoading } = useSelector((state) => state.buses);
  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (!userInfo || !user) {
      message.error("Not Logged In");
      navigate("/login");
    } else {
      dispatch(reset());
      dispatch(ListBusDetails(id));
    }
  }, [navigate, dispatch, userInfo, user, id]);

  const bookNow = () => {
    let value = {
      bus: bus._id,
      seats: selectedSeats,
    };
    dispatch(createBooking(value));
  };

  const onToken = async (token) => {
    console.log(token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const value = {
        token,
        amount: selectedSeats.length * bus.fare * 100,
      };
      const response = await axios.post(
        "/api/bookings/make-payment",
        value,
        config
      );
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  let busFare;
  return (
    <DefaultLayout>
      {isLoading && <Loader />}
      <div>
        {bus && (
          <Row className="mt-3" gutter={[30, 30]}>
            <Col lg={12} xs={24} sm={24}>
              <h1 className="text-2xl secondary-text">{bus.name}</h1>
              <h1 className="text-md">
                {bus.from} - {bus.to}
              </h1>
              <hr />
              <div className="flex flex-col gap-2">
                <p className="text-md">Jourey Date : {bus.journeyDate}</p>
                <p className="text-md">Fare : $ {bus.fare} /-</p>
                <p className="text-md">Departure Time : {bus.departure}</p>
                <p className="text-md">Arrival Time : {bus.arrival}</p>
                <p className="text-md">Capacity : {bus.capacity}</p>
                <p className="text-md">
                  Seats Left :{" "}
                  {bus.seatsBooked && bus.capacity - bus.seatsBooked.length}
                </p>
              </div>
              <hr />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl">
                  <b style={{ color: "rgb(2, 51, 124)" }}>Selected Seats : </b>
                  {selectedSeats.join(" , ")}
                </h1>
                <h1
                  className="text-2xl mt-2"
                  style={{ color: "var(--secondary)" }}
                >
                  <b>Fare :</b>{" "}
                  <b style={{ color: "#953005" }}>
                    Rs. {(busFare = bus.fare * selectedSeats.length)}/-
                  </b>
                  <hr />
                </h1>
                <StripeCheckout
                  token={onToken}
                  amount={bus.fare * selectedSeats.length * 100}
                  currency="INR"
                  stripeKey={process.env.REACT_APP_PUBLIC_KEY}
                >
                  <Button
                    className="text-md secondary-btn mt-3"
                    disabled={busFare === 0}
                    style={{ color: "white" }}
                  >
                    <h5>Book Now</h5>
                  </Button>
                </StripeCheckout>
              </div>
            </Col>
            <Col lg={12} xs={24} sm={24}>
              <SeatSelection
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bus={bus}
              />
            </Col>
          </Row>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BookNow;
