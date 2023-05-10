import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FcInfo } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  FloatingLabel,
  Form,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Footer from "./Footer";
import axios from "axios";

function Login() {
  const userlabel = (
    <>
      Enter Username{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );
  const passwordlabel = (
    <>
      Enter Password{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );

  /* const dispatch = useDispatch();
        const navigate = useNavigate();*/

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (userObj) => {
    console.log(userObj["username"]);
    console.log(userObj["password"]);

    axios
      .post(
        "http://localhost:8083/api/auth/login",

        {
          username: userObj["username"],
          password: userObj["password"],
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.token = `Bearer ${res.data.authenticationToken}`;
        localStorage.isLoggedIn = true;
        console.log(res.data);
        localStorage.demo = res.data["authenticationToken"];
        localStorage.username = userObj["username"];
        localStorage.password = userObj["password"];
        if (localStorage.username === "Admin") {
          window.location = "/adminhome";
        } else {
          window.location = "/";
        }
        //alert("Login Successful");
      })
      .catch((e) => {
        console.log(e);
        alert("Login Failed");
      });
    console.log(localStorage.token);
    console.log(localStorage.demo);
  };

  /*useEffect(() => {
            if (isSuccess) {
                navigate("/applyloan");
            }
        }, [isSuccess, userObj, navigate]);*/

  return (
    <>
      <section
        class="h-100 gradient-form"
        style={{ background: "rgb(112,218,125)" }}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
              <div
                class="card rounded-3 text-black"
                style={{
                  border: "1px solid #000",
                  backgroundColor: "#F2F3F4",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset",
                }}
              >
                <div class="row g-0">
                  <div class="col-lg-6 d-flex align-items-center">
                    <div class="text-dark px-3 py-4 p-md-5 mx-md-4">
                      <div class="text-center">
                        <h1 className="name-head">
                          Internal Banking
                          <br /> Systems &#40; IBS &#41;
                        </h1>
                        <p className="subtext">Your true banking solutions.</p>
                      </div>
                      <h4 class="mb-4">We are more than just a bank.</h4>
                      <p class="small mb-0">
                        Your one and only stop to get the best interest rates
                        for all loans . We believe in getting you the best
                        financial deals in the market . We are not just bankers
                        but your personal financial advisors .
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 right-part-section">
                    <div class="card-body p-md-5 mx-md-4">
                      <h3 style={{ marginBottom: "1.3rem" }}>Sign In</h3>
                      <span
                        className="text-secondary my-3"
                        style={{ fontSize: "15px" }}
                      >
                        <span className="text-danger">
                          <b>*</b>
                        </span>{" "}
                        Mandatory Fields
                      </span>
                      <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="form-outline mb-4 mt-2 mx-auto w-75">
                          {errors.username?.type === "pattern" && (
                            <p className="text-danger">
                              <strong className="text-danger">
                                Can only have alphabets, numbers and
                                underscores. Should have a capital letter.
                                Should start with alphabet.
                              </strong>
                            </p>
                          )}
                          {errors.username?.type === "required" && (
                            <p className="text-danger">
                              <strong className="text-danger">
                                Please enter your username
                              </strong>
                            </p>
                          )}
                          {errors.username?.type === "minLength" && (
                            <p className="text-danger">
                              <strong className="text-danger">
                                Username should be minimum 5 characters long
                              </strong>
                            </p>
                          )}
                          <FloatingLabel
                            className="mb-3 row"
                            controlId="formUsername"
                            label={userlabel}
                          >
                            <Form.Control
                              type="text"
                              placeholder="Enter username"
                              {...register("username", {
                                required: true,
                                minLength: 5,
                                pattern:
                                  /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/,
                              })}
                            />
                          </FloatingLabel>
                        </div>

                        <div className="form-outline mx-auto w-75">
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
                          <FloatingLabel
                            className="mb-3 row"
                            controlId="formPassword"
                            label={passwordlabel}
                          >
                            <Form.Control
                              type="password"
                              placeholder="Enter password"
                              {...register("password", {
                                required: true,
                                minLength: 8,
                                maxLength: 16,
                                pattern:
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                              })}
                            />
                          </FloatingLabel>
                        </div>

                        <div class="text-center pt-1 pb-1">
                          <Link
                            to="/forgotpassword"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <p
                              className="text-primary h6 mb-4"
                              style={{ textDecoration: "none" }}
                            >
                              Forgot Password ?
                            </p>
                          </Link>
                          <Button
                            variant="primary"
                            type="submit"
                            style={{ width: "30%" }}
                          >
                            {" "}
                            <strong className="text-white">Log In</strong>{" "}
                          </Button>
                        </div>
                        {/*
                            <div class="d-flex align-items-center justify-content-center pb-4">
                                <p class="mb-0 me-2">Don't have an account?</p>
                                <button type="button" class="btn btn-outline-danger"><strong className="text-danger">Create new</button>
                            </div>
                    */}
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
