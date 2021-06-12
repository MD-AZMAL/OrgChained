import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { requestAccessApi } from "../../api/apicall";
import useForm from "../../hooks/useForm";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const RequestAreaTableData = ({ currentUser, name, areaCode }) => {
  const [show, setShow] = useState(false);

  const [value, handleChange, formError, handleError, clearValue, clearError] =
    useForm({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const { startTime, endTime } = value;

    const [error, result] = await requestAccessApi(
      currentUser.token,
      startTime,
      endTime,
      areaCode
    );

    if (error) {
      const errorData = error?.response?.data?.content;
      clearError();

      handleError(
        "form",
        errorData.message ? errorData.message : "Error while submitting"
      );
    } else {
      alert(
        `Request Sent to area Code: ${areaCode}\nTransaction ID: ${result.content.id}\nStatus: ${result.content.status}`
      );
    }

    if (error) {
      console.log(error);
    } else {
      clearError();
      clearValue();
      setShow(false);
    }
  };

  const handleClose = () => {
    clearError();
    clearValue();
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Access</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit} className="">
          <Modal.Body>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startTime"
                placeholder="Enter Start time"
                value={value.startTime || ""}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-color-accent">
                {formError.startTime}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endTime"
                placeholder="Enter Start time"
                value={value.endTime || ""}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-color-accent">
                {formError.endTime}
              </Form.Text>
            </Form.Group>
            <Form.Group className="text-center">
              <Form.Text className="text-color-accent">
                {formError.form}
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="color-accent" onClick={handleClose}>
              Close
            </Button>
            <Button variant="color-major" type="submit">
              Request
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <tr>
        <td colSpan="5">{name}</td>
        <td className="text-color-success">{areaCode}</td>
        <td width="50px">
          <Button variant="color-major" onClick={handleShow}>
            Request
          </Button>
        </td>
      </tr>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(RequestAreaTableData);
