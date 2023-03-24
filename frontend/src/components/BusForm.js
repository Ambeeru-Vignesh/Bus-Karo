import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Form, Col, Row, message } from "antd";
import { createBus, listBuses, updateBus } from "../redux/buses/busSlice";
import "../resources/layout.css";
import axios from "axios";

const BusForm = ({
  showBusForm,
  setShowBusForm,
  type = "add",
  selectedBus,
  setSelectedBus,
  getData,
}) => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (type === "add") {
      dispatch(createBus(values));
    } else {
      const value = {
        ...values,
        _id: selectedBus._id,
      };
      dispatch(updateBus(value));
    }
    setShowBusForm(false);
    setSelectedBus("");
    dispatch(listBuses());
  };

  const initialValues = {
    name: "",
    number: "",
    capacity: "",
    from: "",
    to: "",
    journeyDate: "",
    departure: "",
    arrival: "",
    fare: "",
  };

  if (type === "add") {
    selectedBus = initialValues;
  }

  return (
    <Modal show={showBusForm} onHide={setShowBusForm} size="lg">
      <Modal.Header className="Modal">
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Modal.Body>
          <Row gutter={[10, 10]}>
            <Col lg={24} xs={24}>
              <Form.Item label="Bus Name" name="name">
                <input type="text" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Bus Number" name="number">
                <input type="text" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Capacity" name="capacity">
                <input type="text" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="From" name="from">
                <input type="text" />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="To" name="to">
                <input type="text" />
              </Form.Item>
            </Col>

            <Col lg={8} xs={24}>
              <Form.Item label="Journey Date" name="journeyDate">
                <input type="date" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item label="Departure" name="departure">
                <input type="time" />
              </Form.Item>
            </Col>
            <Col lg={8} xs={24}>
              <Form.Item label="Arrival" name="arrival">
                <input type="time" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="Type" name="type">
                <select name="" id="">
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Fare" name="fare">
                <input type="text" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item label="Status" name="status">
                <select name="" id="">
                  <option value="Yet To Start">Yet To Start</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                </select>
              </Form.Item>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="Modal">
          <Button
            variant="secondary"
            onClick={() => {
              setShowBusForm(false);
              setSelectedBus("");
            }}
          >
            Close
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BusForm;
