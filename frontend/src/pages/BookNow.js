import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, message } from "antd";
import Loader from "../components/Loader";
import { ListBusDetails, reset } from "../redux/buses/busSlice";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import SeatSelection from "../components/SeatSelection";

const BookNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  //   const [selectedSeats, setSelectedSeats] = useState([]);

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
                <p className="text-md"></p>
              </div>
              <hr />
            </Col>
            <Col lg={12} xs={24} sm={24}>
              <SeatSelection bus={bus} />
            </Col>
          </Row>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BookNow;
