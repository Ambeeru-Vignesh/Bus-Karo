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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber: pageNo } = useParams();
  const pageNumber = pageNo || 1;

  const { user, isSuccess, isError } = useSelector((state) => state.auth);

  const { isLoading, buses, pages, page } = useSelector((state) => state.buses);

  const userInfo = localStorage.getItem("user");

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
