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
import { createBooking } from "../redux/bookings/bookingSlice";

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

  const booknow = () => {
    let value = {
      bus: bus._id,
      seats: selectedSeats,
    };
    dispatch(createBooking(value));
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
                    $ {(busFare = bus.fare * selectedSeats.length)}/-
                  </b>
                  <hr />
                </h1>
                <Button
                  className="text-md secondary-btn mt-3"
                  disabled={busFare === 0}
                  style={{ color: "white" }}
                  onClick={booknow}
                >
                  <h5>Book Now</h5>
                </Button>
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
