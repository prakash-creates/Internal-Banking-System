//import "./Forgotpassword.css";
import {
  FloatingLabel,
  Form,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import axios from "axios";
import Footer from "./Footer";
import {useForm } from "react-hook-form";
import React, { useState } from "react";

import { FcInfo } from "react-icons/fc";



function FormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [usernameValue, setUsername] = useState();
  const [password, setPassword] = useState();
  const [page, setPage] = useState(0);
  console.log(page);
  const popover = (
    <Popover id="username-popover">
      <Popover.Header as="h3">Username - Allowed patterns</Popover.Header>
      <Popover.Body>
        <ul>
          <li>Alphabets, numbers and underscore ( _ ) only.</li>
          <li>Should start with alphabet only.</li>
          <li>Cannot end with underscore ( _ ).</li>
          <li>Minimum length = 5 characters</li>
        </ul>
      </Popover.Body>
    </Popover>
  );
  const popoverPass = (
    <Popover id="password-popover">
      <Popover.Header as="h3">Password - Allowed patterns</Popover.Header>
      <Popover.Body>
        <ul>
          <li>Alphanumeric characters only.</li>
          <li>At least 1 uppercase letter.</li>
          <li>At least 1 lowercase letter.</li>
          <li>At least 1 number.</li>
          <li>Minimum length = 8 characters</li>
          <li>Maximum length = 16 characters</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <>
          <Form autoComplete="off" onSubmit={handleSubmit(onUserEntry)}>
            <div class="form-outline mb-4">
              <FloatingLabel
                className="mb-3"
                controlId="formUsername"
                label="Enter Username"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  {...register("username", {
                    required: true,
                    minLength: 5,
                    pattern: /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/,
                  })}
                />
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <Button variant="none" style={{ marginTop: "0.5em" }}>
                    <FcInfo style={{ fontSize: "1em" }} />{" "}
                    <span
                      className="text-muted"
                      style={{ fontWeight: "700", fontSize: "0.9em" }}
                    >
                      Username Pattern
                    </span>
                  </Button>
                </OverlayTrigger>
                {errors.username?.type === "pattern" && (
                  <p className="text-danger">
                    <strong>Please use the valid format of username</strong>
                  </p>
                )}
                {errors.username?.type === "required" && (
                  <p className="text-danger">
                    <strong>Please enter your username</strong>
                  </p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="text-danger">
                    <strong>
                      Username should be minimum 5 characters long
                    </strong>
                  </p>
                )}
              </FloatingLabel>
            </div>
            <div class="form-outline mb-4">
              <FloatingLabel
                className="mb-3"
                controlId="formEmailid"
                label="Enter Email id"
              >
                <Form.Control type="text" placeholder="Enter Email id" {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}/>
                {errors.email?.type === "pattern" && (
                  <p className="text-danger">
                    <strong>Please provide a valid email id</strong>
                  </p>
                )}
                {errors.email?.type === "required" && (
                  <p className="text-danger">
                    <strong>Please enter your email id</strong>
                  </p>
                )}
              </FloatingLabel>
            </div>
            <div class="form-outline mb-4">
              <FloatingLabel
                className="mb-3"
                controlId="formPhoneno"
                label="Enter Phone Number"
              >
                <Form.Control type="number" placeholder="Enter Phone number"  {...register("phone", { required: true, minLength: 8, maxLength: 10})}/>
                {errors.phone?.type === "minLength" && (
                  <p className="text-danger">
                    <strong>Please provide a valid contact number</strong>
                  </p>
                )}
                {errors.phone?.type === "required" && (
                  <p className="text-danger">
                    <strong>Please enter your contact number</strong>
                  </p>
                )}
                {errors.phone?.type === "maxLength" && (
                  <p className="text-danger">
                    <strong>Please provide a valid contact number</strong>
                  </p>
                )}
              </FloatingLabel>
            </div>
            <Button
              //type="submit"
              variant="primary"
              style={{ width: "30%", margin: "10px 40px" }}
              //disabled={page == 0}
              onClick={handleSubmit(onUserEntry)}
            >
              Verify User
            </Button>
          </Form>
        </>
      );
    } else if (page === 1) {
      return (
        <>
          <Form autoComplete="off" onSubmit={handleSubmit(onVerifyOtp)}>
            <div class="form-outline mb-4">
              <FloatingLabel
                className="mb-3"
                controlId="formotp"
                label="Enter the OTP"
              >
                <Form.Control
                  type="number"
                  placeholder="Enter the OTP"
                  {...register("otp", {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                  })}
                />
              </FloatingLabel>
              {errors.otp?.type === "required" && (
                <p className="text-danger">
                  <strong>
                    Please enter the OTP received in the registered emailid.
                  </strong>
                </p>
              )}
              {errors.otp?.type === "minLength" && (
                <p className="text-danger">
                  <strong>OTP should be minimum 6 characters long</strong>
                </p>
              )}
              {errors.otp?.type === "maxLength" && (
                <p className="text-danger">
                  <strong>OTP can be maximum 6 characters long</strong>
                </p>
              )}
            </div>
            <Button
              //type="submit"
              variant="primary"
              style={{ width: "30%", margin: "10px 40px" }}
              //disabled={page == 0}
              onClick={handleSubmit(onVerifyOtp)}
            >
              Verify Otp
            </Button>
          </Form>
        </>
      );
    } else {
      return (
        <>
          <Form autoComplete="off" onSubmit={handleSubmit(onPasswordSubmit)}>
            <div className="mb-4">
            <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popoverPass}
                >
                  <Button variant="none" style={{ marginTop: "0.5em" }}>
                    <FcInfo style={{ fontSize: "1em" }} />{" "}
                    <span
                      className="text-muted"
                      style={{ fontWeight: "700", fontSize: "0.9em" }}
                    >
                      Allowed Password Pattern
                    </span>
                  </Button>
                </OverlayTrigger>
            </div>
            <div class="form-outline mb-4">
              <FloatingLabel className="mb-3 row" controlId="formPassword" label="Enter Password">
                <Form.Control type="password" placeholder="Enter password" {...register("password", {required: true, minLength: 8, maxLength: 16, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}/>
                {errors.password?.type === "pattern" && (
                  <p className="text-danger">
                    <strong>Please follow the pattern for password</strong>
                  </p>
                )}
                {errors.password?.type === "required" && (
                  <p className="text-danger">
                    <strong>Please enter your Password</strong>
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-danger">
                    <strong>
                      Password should be minimum 8 characters long
                    </strong>
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-danger">
                    <strong>Password can be maximum 16 characters long</strong>
                  </p>
                )}
              </FloatingLabel>
            </div>
            <div class="form-outline mb-4">
              <FloatingLabel
                className="mb-3 row"
                controlId="formCpassword"
                label="Confirm Password"
              >
                <Form.Control type="text" placeholder="Confirm Password" {...register("cpassword", {required: true, minLength: 8, maxLength: 16, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}/>
                {errors.cpassword?.type === "pattern" && (
                  <p className="text-danger">
                    <strong>Please follow the pattern for password</strong>
                  </p>
                )}
                {errors.cpassword?.type === "required" && (
                  <p className="text-danger">
                    <strong>Please enter your Password</strong>
                  </p>
                )}
                {errors.cpassword?.type === "minLength" && (
                  <p className="text-danger">
                    <strong>
                      Password should be minimum 8 characters long
                    </strong>
                  </p>
                )}
                {errors.cpassword?.type === "maxLength" && (
                  <p className="text-danger">
                    <strong>Password can be maximum 16 characters long</strong>
                  </p>
                )}
              </FloatingLabel>
            </div>
            <Button
              //type="submit"
              variant="primary"
              style={{ width: "30%", margin: "10px 40px" }}
              //disabled={page == 0}
              onClick={handleSubmit(onPasswordSubmit)}
            >
              Submit Password
            </Button>
          </Form>
        </>
      );
    }
  };
  const onUserEntry = (userObj) => {
      console.log(userObj["username"]);
      setUsername(userObj["username"]);
   /*  setPage(1);
    //console.log(userObj["username"]);
    alert("User Available");
    setUsername(userObj["username"]);

    console.log(username);
    console.log(page);
 */
     axios
      .post("http://localhost:8083/api/auth/usernamecheck", {
        userName: userObj["username"]
        //password: userObj["password"]
      })
      .then((res) => {
        console.log(res);
        localStorage.token = `Bearer ${res.data.jwttoken}`;
        setUsername(userObj["username"]);
        //localStorage.isLoggedIn = true;
        localStorage.username = userObj["username"];
        //window.location = "/";
        //alert("User is Verified!");
        setPage(1);
      })
      .catch((e) => {
        console.log(e.response.data);
        alert("User not available.");
      }); 
  };
  const onVerifyOtp = (userObj) => {
    console.log(userObj["otp"]);
    if (userObj["otp"] === "111111") {
      alert("OTP entered is correct.User is verified");
      setPage(page + 1);
    } else {
      alert("OTP entered is incorrect");
    }
    console.log(page);
  };
  const onPasswordSubmit = (userObj) => {
    console.log(userObj["username"]);
    console.log(userObj["password"]);
    console.log(userObj["cpassword"]);
    console.log("This is username" + usernameValue);

     if(userObj["password"] === userObj["cpassword"])
     {
      axios
      .put("http://localhost:8083/api/auth/reset", {
        //userName: userObj["username"],
        userName : usernameValue,
        password: userObj["password"]
      })
      .then((res) => {
        console.log(res);
        //localStorage.token = `Bearer ${res.data.jwttoken}`;
       // setUsername(userObj["username"]);
        //localStorage.isLoggedIn = true;
        localStorage.username = userObj["username"];
        //window.location = "/";
        alert("Password changed successfully");
        window.location = "/login";
      })
      .catch((e) => {
        console.log(e.response.data);
        alert("Password could not be changed , some error occured");
        setPage(0);
      });
     }
     else
     {
      alert("Passwords don't match")
     } 
    
    setPassword(userObj["password"]);

  };

  return (
    <>
      <section
        class="h-100 gradient-form"
        style={{ background: "rgb(112,218,125)" }}
      >
        <div class="container py-5 h-100">
          <p className="text-center display-3" style={{ fontWeight: "700" }}>
            Reset Password
          </p>
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
                <div class="col-lg-12 ">
                  <div class="card-body p-md-5 mx-md-4">
                    {PageDisplay()}
                    {/* <Button
                      variant="primary"
                      style={{ width: "30%", margin: "10px 40px" }}
                      disabled={page == 0}
                      onClick={() => setPage(page - 1)}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="primary"
                      style={{ width: "30%" }}
                      disabled={page == 2}
                      onClick={() => setPage(page + 1)}
                    >
                      <strong className="text-white">Next</strong>
                    </Button> */}
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

export default FormContainer;