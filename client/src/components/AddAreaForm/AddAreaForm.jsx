import React, {useState} from "react";
import {Button, Modal,  Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addAreaApi, getAreasApi } from "../../api/apicall";
import useForm from "../../hooks/useForm";
import { setCurrentAreas } from "../../redux/area/area.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const AddAreaForm = ({currentUser, setCurrentAreas}) => {
  const [show, setShow] = useState(false);

  const [value, handleChange, formError, handleError, clearValue, clearError] =
    useForm({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, areaCode } = value;

    const [error, result] = await addAreaApi(
      currentUser.token,
      name,
      areaCode,
    );

    if (error) {
      const errorData = error?.response?.data?.content;
      clearError();

      switch (errorData?.errorCode) {
        case 4:
        case 3:
          handleError("areaCode", errorData.message);
          break;
        case 1:
        case 2:
          handleError("form", errorData.message);
          break;
        default:
          handleError("form", "Error while submitting");
          break;
      }
    }
    if (result.success) {



      clearError();
      clearValue();

      const [error, res] = await getAreasApi(currentUser.token);
      handleClose();
      
      if (error) {
        console.log(error);
      } else {
        setCurrentAreas(res.content.areas);
      }

      alert("Area added Successfully")
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
              <Form.Label>Area Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter Area name"
                value={value.name || ""}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-color-accent">
                {formError.name}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Area Code</Form.Label>
              <Form.Control
                type="name"
                name="areaCode"
                placeholder="Enter Area name"
                value={value.areaCode || ""}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-color-accent">
                {formError.areaCode}
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
              Add Area
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Button variant="color-minor" onClick={handleShow} block>
        Add Area
      </Button>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentAreas: (areas) => dispatch(setCurrentAreas(areas))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAreaForm);
