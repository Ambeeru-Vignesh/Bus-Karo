import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import BusForm from "../../components/BusForm";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBus,
  ListBusDetails,
  listBuses,
} from "../../redux/buses/busSlice";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import { message } from "antd";
import Loader from "../../components/Loader";

const AdminBuses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber: pageNo } = useParams();
  const pageNumber = pageNo || 1;

  const [showBusForm, setShowBusForm] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const busList = useSelector((state) => state.buses);
  const { isLoading, buses, pages, page } = busList;

  const { bus } = useSelector((state) => state.buses);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/login");
    } else {
      dispatch(listBuses(pageNumber));
    }
  }, [navigate, dispatch, user, pageNumber]);

  const onEditHandler = (id) => {
    dispatch(ListBusDetails(id));
    setShowBusForm(true);
  };

  const onDeleteHandler = (id) => {
    dispatch(deleteBus(id));
    dispatch(listBuses());
  };

  return (
    <>
      {user && user.isAdmin ? (
        <DefaultLayout>
          <div>
            <div className="d-flex justify-content-between my-2">
              <button
                className="secondary-btn"
                id="add-btn"
                onClick={() => {
                  setShowBusForm(true);
                  setSelectedBus(null);
                }}
              >
                <strong>Add Bus</strong>
              </button>
            </div>
          </div>
          {isLoading && <Loader />}
          <Table striped bordered hover>
            <thead className="Table-Head" style={thead}>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>From</th>
                <th>To</th>
                <th>Journey Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id}>
                  <td>{bus.name}</td>
                  <td>{bus.number}</td>
                  <td>{bus.from}</td>
                  <td>{bus.to}</td>
                  <td>{bus.journeyDate}</td>
                  <td>{bus.status}</td>
                  <td>
                    <span className="d-flex gap-3">
                      <i
                        className="ri-delete-bin-line"
                        onClick={() => {
                          onDeleteHandler(bus._id);
                        }}
                      ></i>
                      <i
                        className="ri-pencil-line"
                        onClick={() => {
                          onEditHandler(bus._id);
                          setSelectedBus(bus);
                        }}
                      ></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showBusForm && (
            <BusForm
              showBusForm={showBusForm}
              setShowBusForm={setShowBusForm}
              type={selectedBus ? "edit" : "add"}
              selectedBus={selectedBus}
              setSelectedBus={setSelectedBus}
              getData={buses}
            />
          )}
          <Paginate pages={pages} page={page} isAdmin={true} />
        </DefaultLayout>
      ) : (
        <h1>{message.error("Not Authorized")}</h1>
      )}
    </>
  );
};

const thead = {
  backgroundColor: "#191e89",
  color: "white",
};

export default AdminBuses;
