import React, { useEffect, useState, useContext, Fragment } from "react";
import Select from "react-select";
import dataHero from "data-hero";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  CardFooter,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { observer } from "mobx-react";
import TicketStore from "../../../stores/TicketStore";
import UserStore from "../../../stores/UserStore";
const schema = {
  name: {
    isEmpty: false,
    min: 1,
    message: "Subject is required",
  },
  category: {
    isEmpty: false,
    min: 1,
    message: "Category is required",
  },
  staff_id: {
    isEmpty: false,
    min: 1,
    message: "Staff is required",
  },
  description: {
    min: 5,
    message: "Description cannot be empty",
  },
};

const TicketForm = ({ mode, open, handleClose, initial_data }) => {
  const tickStore = useContext(TicketStore);
  const userStore = useContext(UserStore);
  const { createTicket, updateTicket, sending, saved, toggleClose } = tickStore;
  const { fetchUsers, userSelect: users } = userStore;
  const [title, setTitle] = useState("Create Ticket");

  const [formState, setFormState] = useState({
    values: {
      id: "",
      name: "",
      category: "",
      user: "Admin",
      staff_id: "",
      requester: "Staff",
      priority: "Low",
      description: "",
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Ticket");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            name: data && data.name,
            category: data && data.category,
            staff_id: data && data.staff_id,
            description: data && data.description,
          },
        }));
      }
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          name: "",
          category: "",
          user: "Admin",
          staff_id: "",
          requester: "Staff",
          priority: "Low",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid:
        errors.name.error ||
        errors.category.error ||
        errors.staff_id.error ||
        errors.description.error
          ? false
          : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  useEffect(() => {
    if (saved === true) {
      resetForm();
      toggleClose();
    }
  }, [saved]);
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleStaff = (e) => {
    if (e !== null) {
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          staff_id: e.value,
        },
        touched: {
          ...state.touched,
          staff_id: true,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          staff_id: "",
        },
      }));
    }
  };
  const onEditorStateChange = (e, editor) => {
    const data = editor.getData();
    setFormState((state) => ({
      ...formState,
      values: {
        ...formState.values,
        description: data,
      },
      touched: {
        ...formState.touched,
        description: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createTicket(formState.values)
      : updateTicket(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        name: "",
        category: "",
        user: "Admin",
        staff_id: "",
        requester: "Staff",
        priority: "Low",
        description: "",
      },
      touched: {},
      errors: {},
    }));
  };
  const closeBtn = (
    <Button className="close" onClick={handleClose}>
      &times;
    </Button>
  );
  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose}>
        <ModalHeader toggle={handleClose} close={closeBtn}>
          {title}
        </ModalHeader>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label for="name">Subject</Label>
                      <Input
                        type="text"
                        value={formState.values.name || ""}
                        name="name"
                        onChange={handleChange}
                        placeholder="Ticket Subject"
                        invalid={hasError("name")}
                      />
                      <FormFeedback>
                        {hasError("name")
                          ? formState.errors.name.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label for="category">Related Services</Label>
                      <Input
                        type="select"
                        value={formState.values.category || ""}
                        name="category"
                        onChange={handleChange}
                        placeholder="Related Services"
                      >
                        <option value="">Select One</option>
                        <option value="Asset">Asset</option>
                        <option value="Order">Order</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="priority">Priority</Label>
                      <Input
                        type="select"
                        value={formState.values.priority || ""}
                        name="priority"
                        onChange={handleChange}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="staff_id">Staff</Label>
                      <Select
                        placeholder="Select Option"
                        name="staff_id"
                        value={
                          users.filter(
                            (obj) => obj.value === formState.values.staff_id
                          ) || ""
                        }
                        onChange={handleStaff}
                        isLoading={users && users.length > 0 ? false : true}
                        isClearable={true}
                        options={users}
                      />
                      <span
                        className={hasError("staff_id") ? "text-danger" : null}
                      >
                        {hasError("staff_id")
                          ? formState.errors.staff_id &&
                            formState.errors.staff_id.message
                          : null}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup
                      className={hasError("description") ? "has-danger" : null}
                    >
                      <Label for="description">Description</Label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formState.values.description}
                        // config={configuration}
                        onChange={onEditorStateChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  disabled={!formState.isValid || sending}
                  type="submit"
                >
                  {sending ? (
                    <span>
                      {" "}
                      Saving data <i className="fa fa-spinner"></i>
                    </span>
                  ) : (
                    "Submit Ticket"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>{" "}
            <Button
              color="primary"
              disabled={!formState.isValid || sending }
              type="submit"
            >
              {sending ? (
                <span>
                  {" "}
                  Saving data <i className="fa fa-spinner"></i>
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  );
};

export default observer(TicketForm);
