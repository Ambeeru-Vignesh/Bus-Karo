import React, { useState } from "react";
import { Row, Col } from "antd";
import "../resources/bus.css";

const SeatSelection = ({ bus }) => {
  const capacity = bus.capacity;

  const [selectedSeats, setSelectedSeats] = useState([0]);

  const [seatClass, setSeatClass] = useState("");

  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  return (
    <div className="mx-5">
      <div className="bus-container">
        <Row gutter={[10, 10]}>
          {[...Array(capacity).keys()].map((seat) => (
            <Col span={6}>
              {selectedSeats.includes(seat + 1) &&
                setSeatClass("selected-seat")}
              {bus.seatsBooked.includes(seat + 1) &&
                setSeatClass("booked-seat")}
              <div
                className={`seat ${seatClass}`}
                onClick={() => selectOrUnselectSeats(seat + 1)}
              >
                {seat + 1}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SeatSelection;
