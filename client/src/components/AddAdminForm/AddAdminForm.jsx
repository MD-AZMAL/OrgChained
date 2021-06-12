import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router";
import { createStructuredSelector } from "reselect";
import { addAreaAdminApi, getAreaApi } from "../../api/apicall";
import useForm from "../../hooks/useForm";
import { setCurrentArea } from "../../redux/area/area.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const AddAdminForm = ({ currentUser,setCurrentArea }) => {
  const [show, setShow] = useState(false);
  const { params } = useRouteMatch();

  const [value, handleChange, formError, handleError, clearValue, clearError] =
    useForm({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const { idNo } = value;

    const [error, result] = await addAreaAdminApi(
      currentUser.token,
      params.areaCode,
      idNo
    );

    if (error) {
      const errorData = error?.response?.data?.content;
      clearError();

      switch (errorData?.errorCode) {
        case 4:
        case 5:
          handleError("idNo", errorData.message);
          break;
        case 1:
        case 2:
        case 6:
          handleError("form", errorData.message);
          break;
        default:
          handleError("form", "Error while submitting");
          break;
      }
    } else if (result.content.success) {

      clearError();
      clearValue();

      const [error, res] = await getAreaApi(currentUser.token, params.areaCode);
      handleClose();
      
      if (error) {
        console.log(error);
      } else {
        setCurrentArea(res.content.area);
      }
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
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit} className="">
          <Modal.Body>
            <Form.Group>
              <Form.Label>ID no</Form.Label>
              <Form.Control
                type="name"
                name="idNo"
                placeholder="Enter ID Number"
                value={value.idNo || ""}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-color-accent">
                {formError.idNo}
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
              Add Admin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Button variant="color-minor" onClick={handleShow}>
        Add Admin
      </Button>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentArea: (area) => dispatch(setCurrentArea(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAdminForm);
