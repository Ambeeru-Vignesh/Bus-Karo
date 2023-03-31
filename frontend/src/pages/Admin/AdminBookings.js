import { Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DefaultLayout from "../../components/DefaultLayout";
import { useReactToPrint } from "react-to-print";
import Loader from "../../components/Loader";
import { getAllBookings } from "../../redux/bookings/bookingSlice";

const AdminBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [booking, setBooking] = useState([]);

  const { isLoading, bookings, isSuccess } = useSelector(
    (state) => state.bookings
  );

  const { user } = useSelector((state) => state.auth);

  const userInfo = localStorage.getItem("user");

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticket
          </p>
        </div>
      ),
    },
  ];

  let mappedData;

  useEffect(() => {
    if (!userInfo || !user) {
      console.log("not logged in");
      navigate("/login");
    } else {
      dispatch(getAllBookings());

      if (isSuccess) {
        mappedData = bookings.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBooking(mappedData);
      }
    }
  }, [dispatch, navigate, userInfo, user, isSuccess]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      {isLoading && <Loader />}
      {user && (
        <div>
          <div className="mt-2">
            <Table dataSource={booking} columns={columns} />
          </div>
          {showPrintModal && (
            <Modal
              title="Print Ticket"
              onCancel={() => {
                setShowPrintModal(false);
                setSelectedBooking(null);
              }}
              open={showPrintModal}
              okText="Print"
              onOk={handlePrint}
            >
              <div className="d-flex flex-column p-5" ref={componentRef}>
                <p>Bus : {selectedBooking.name}</p>
                <p>
                  {selectedBooking.from} - {selectedBooking.to}
                </p>
                <hr />
                <p>
                  <span>Journey Date:</span>{" "}
                  {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
                </p>
                <p>
                  <span>Journey Time:</span> {selectedBooking.departure}
                </p>
                <hr />
                <p>
                  <span>Seat Numbers:</span> <br />
                  {selectedBooking.seats}
                </p>
                <hr />
                <p>
                  <span>Total Amount:</span>{" "}
                  {selectedBooking.fare * selectedBooking.seats.length} /-
                </p>
              </div>
            </Modal>
          )}
        </div>
      )}
    </DefaultLayout>
  );
};

export default AdminBookings;
