import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col } from "antd";
import Loader from "../components/Loader";
import Bus from "../components/Bus";
import { listBuses } from "../redux/buses/busSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber: pageNo } = useParams();
  const pageNumber = pageNo || 1;

  const [filters = {}, setFilters] = useState({});

  const { user, isSuccess, isError } = useSelector((state) => state.auth);

  const userInfo = localStorage.getItem("user");

  const { isLoading, buses, pages, page } = useSelector((state) => state.buses);

  useEffect(() => {
    if (!userInfo || !user) {
      console.log("not logged in");
      navigate("/login");
    } else {
      dispatch(listBuses(pageNumber));
    }
  }, [navigate, dispatch, userInfo, user, pageNumber]);

  return (
    <>
      <DefaultLayout>
        {user && (
          <>
            {isLoading && <Loader />}
            <div className="my-3 py-1">
              <Row gutter={10} align="center">
                <Col lg={6} sm={24}>
                  <input
                    type="text"
                    placeholder="From"
                    value={filters.from}
                    onChange={(e) =>
                      setFilters({ ...filters, from: e.target.value })
                    }
                  />
                </Col>
                <Col lg={6} sm={24}>
                  <input
                    type="text"
                    placeholder="To"
                    value={filters.to}
                    onChange={(e) =>
                      setFilters({ ...filters, to: e.target.value })
                    }
                  />
                </Col>
                <Col lg={6} sm={24}>
                  <input
                    type="date"
                    placeholder="Date"
                    value={filters.journeyDate}
                    onChange={(e) =>
                      setFilters({ ...filters, journeyDate: e.target.value })
                    }
                  />
                </Col>
                <Col lg={6} sm={24}>
                  <div className="d-flex gap-2">
                    <button
                      className="secondary-btn text-md"
                      onClick={() => listBuses(pageNumber)}
                    >
                      Filter
                    </button>
                    <button
                      className="outlined px-3 text-md"
                      onClick={() =>
                        setFilters({
                          from: "",
                          to: "",
                          journeyDate: "",
                        })
                      }
                    >
                      Clear
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={[15, 15]}>
                {buses
                  .filter((bus) => bus.status === "Yet To Start")
                  .map((bus) => (
                    <Col lg={12} xs={24} sm={24} key={bus._id}>
                      <Bus bus={bus} />
                    </Col>
                  ))}
              </Row>
            </div>
            <div className="Paginate">
              <Paginate pages={pages} page={page} />
            </div>
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default Home;
