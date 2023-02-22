import React, { useState, setState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import "./Registration.css";
import { useForm } from "react-hook-form";
import Menu from "./Menu";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (userObj) => {
    console.log(userObj);
    /*axios*/
    axios
      .post("http://localhost:8083/api/auth/signup", userObj)
      .then((res) => {
        console.log(res);

        alert("Registration Successful");
      })
      .catch((e) => {
        console.log(e);
        alert("Registration Failed");
      });
  };

  return (
    <Container fluid className="Admin-registration">
      <Menu />
      <Row
        className="d-flex justify-content-center w-100 align-items-center"
        style={{
          marginLeft: "1%",
          marginRight: "3%",
        }}
      >
        <Col className="mt-3 mb-5">
          <Card
            style={{
              border: "1px solid #000",
              paddingLeft: "10%",
              backgroundColor: "#ededf2",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset",
            }}
          >
            <Card.Body className="px-4">
              <Form onSubmit={handleSubmit(onFormSubmit)}>
                <p
                  className="h3 my-4"
                  style={{ fontFamily: "cursive", color: "#093d65" }}
                >
                  <center>
                    {" "}
                    <b>Registration for a new user</b>
                  </center>
                </p>

                {/* <div
                  className="form"
                  style={{
                    border: "1px solid #000",
                    backgroundColor: "#F2F3F4",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset",
                  }}
                > */}
                <div className="form-body">
                  <div className="name">
                    <label className="form__label" for="name">
                      Name{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>
                    </label>
                    <input
                      className="form__input"
                      type="text"
                      id="name"
                      {...register("name", {
                        required: true,
                        pattern: /^[a-zA-Z ]*$/,
                        maxLength: 150,
                      })}
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-danger text-right">
                        <strong className="text-danger">
                          Please enter your name
                        </strong>
                      </p>
                    )}
                    {errors.name?.type === "pattern" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter a valid name
                        </strong>
                      </p>
                    )}
                    {errors.name?.type === "maxLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter a valid name
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="userName">
                    <label className="form__label" for="userName">
                      Username{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                    </label>
                    <input
                      type="text"
                      name=""
                      id="userName"
                      className="form__input"
                      {...register("userName", {
                        required: true,
                        minLength: 5,
                        pattern: /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/,
                      })}
                    />
                    {errors.userName?.type === "pattern" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please use the valid format of username
                        </strong>
                      </p>
                    )}
                    {errors.userName?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter your username
                        </strong>
                      </p>
                    )}
                    {errors.userName?.type === "minLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Username should be minimum 5 characters long
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="emailid">
                    <label className="form__label" for="emailid">
                      Email id{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                    </label>
                    <input
                      type="email"
                      id="emailid"
                      className="form__input"
                      {...register("emailid", {
                        required: true,
                        pattern:
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                    />
                    {errors.emailid?.type === "pattern" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please provide a valid email id
                        </strong>
                      </p>
                    )}
                    {errors.emailid?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter your email id
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="password">
                    <label className="form__label" for="password">
                      Password{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                    </label>
                    <input
                      className="form__input"
                      type="password"
                      id="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 16,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      })}
                    />
                    {errors.password?.type === "pattern" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please follow the pattern for password
                        </strong>
                      </p>
                    )}
                    {errors.password?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter your Password
                        </strong>
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Password should be minimum 8 characters long
                        </strong>
                      </p>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Password can be maximum 16 characters long
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="designation">
                    <label className="form__label" for="designation">
                      Select the Designation{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>
                    </label>
                    <select
                      className="form__input"
                      placeholder="Select Designation"
                      {...register("designation", { required: true })}
                    >
                      <option value="Programmer Analyst Trainee" defaultChecked>
                        Programmer Analyst Trainee
                      </option>
                      <option value="Programmer Analyst">
                        Programmer Analyst
                      </option>
                      <option value="Associate">Associate</option>
                      <option value="Sr. Associate">Sr. Associate</option>
                      <option value="Manager">Manager</option>
                      <option value="Sr. Manager">Sr. Manager</option>
                      <option value="Associate Director">
                        Associate Director
                      </option>
                      <option value="Director">Director</option>
                      <option value="Sr. Director">Sr. Director</option>
                      <option value="Vice President">
                        Associate Vice President / Sr. Vice President
                      </option>
                    </select>
                    {errors.designation?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please select your designation.
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="usertype">
                    <label className="form__label" for="usertype">
                      User Type{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                    </label>
                    <input
                      className="form__input"
                      type="text"
                      id="usertype"
                      value="user"
                      readOnly
                      style={{
                        border: "dotted",
                        color: "#a7a8a7",
                      }}
                      {...register("usertype", { required: true })}
                    />
                  </div>
                  <div className="gender">
                    <label className="form__label" for="gender">
                      Gender{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>
                    </label>

                    <select
                      className="form__input"
                      placeholder="Select the gender"
                      {...register("gender", { required: true })}
                    >
                      <option value="Male" defaultChecked>
                        Male
                      </option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.gender?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please select your designation.
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="address">
                    <label className="form__label" for="address">
                      Address{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                    </label>
                    <textarea
                      style={{ height: "80px", border: "1.75px solid #093d65" }}
                      className="form__input"
                      id="address"
                      {...register("address", {
                        required: true,
                        maxLength: 300,
                      })}
                    />
                    {errors.address?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter the address of the property.
                        </strong>
                      </p>
                    )}
                    {errors.address?.type === "maxLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Enter the address in 300 characters or less.
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="contactNo">
                    <label className="form__label" for="contactno">
                      Contact Number{" "}
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                    </label>
                    <input
                      className="form__input"
                      type="number"
                      id="contactno"
                      {...register("contactno", {
                        required: true,
                        minLength: 8,
                        maxLength: 10,
                      })}
                    />
                    {errors.contactno?.type === "minLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please provide a valid contact number
                        </strong>
                      </p>
                    )}
                    {errors.contactno?.type === "required" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please enter your contact number
                        </strong>
                      </p>
                    )}
                    {errors.contactno?.type === "maxLength" && (
                      <p className="text-danger">
                        <strong className="text-danger">
                          Please provide a valid contact number
                        </strong>
                      </p>
                    )}
                  </div>
                </div>
                <div className="registerButton">
                  <center>
                    <Button
                      variant="outline-primary"
                      style={{ width: "30%" }}
                      type="submit"
                      className="w-25 my-4"
                    >
                      Register
                    </Button>
                  </center>
                </div>
                {/* </div> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
