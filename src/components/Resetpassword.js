import { FloatingLabel, Form, Button } from "react-bootstrap";
import axios from "axios";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

import { FcInfo } from "react-icons/fc";

export default function Resetpassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [oldpassword, setOldpassword] = useState();
  const [password, setPassword] = useState();
  const [page, setPage] = useState(0);
  console.log(page);

  const currpasslabel = (
    <>
      Enter Password{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );

  const otplabel = (
    <>
      Enter the OTP{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );
  const passwordlabel = (
    <>
      Enter the password{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );

  const cpasswordlabel = (
    <>
      Confirm Password{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <>
          <Form autoComplete="off" onSubmit={handleSubmit(onUserEntry)}>
            <div class="form-outline mb-4 w-75 mx-auto">
              {errors.currpass?.type === "pattern" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Please follow the pattern for password
                  </strong>
                </p>
              )}
              {errors.currpass?.type === "required" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Please enter your Password
                  </strong>
                </p>
              )}
              {errors.currpass?.type === "minLength" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Password should be minimum 8 characters long
                  </strong>
                </p>
              )}
              {errors.currpass?.type === "maxLength" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Password can be maximum 16 characters long
                  </strong>
                </p>
              )}
              <FloatingLabel
                className="mb-3"
                controlId="formPassword"
                label={currpasslabel}
              >
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  {...register("currpass", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  })}
                />
              </FloatingLabel>
            </div>

            <Button
              //type="submit"
              variant="primary"
              style={{ width: "30%", margin: "10px 40px" }}
              //disabled={page == 0}
              onClick={handleSubmit(onUserEntry)}
            >
              Verify Password
            </Button>
          </Form>
        </>
      );
    } else if (page === 1) {
      return (
        <>
          <Form autoComplete="off" onSubmit={handleSubmit(onVerifyOtp)}>
            <div class="form-outline mb-4 w-75 mx-auto">
              {errors.otp?.type === "required" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Please enter the OTP received in the registered emailid.
                  </strong>
                </p>
              )}
              {errors.otp?.type === "minLength" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    OTP should be minimum 6 characters long
                  </strong>
                </p>
              )}
              {errors.otp?.type === "maxLength" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    OTP can be maximum 6 characters long
                  </strong>
                </p>
              )}
              <FloatingLabel
                className="mb-3"
                controlId="formotp"
                label={otplabel}
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
            <div className="mb-4"></div>
            <div class="form-outline mb-4 w-75 mx-auto">
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
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  })}
                />
              </FloatingLabel>
            </div>
            <div class="form-outline mb-4 w-75 mx-auto">
              {errors.cpassword?.type === "pattern" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Please follow the pattern for password
                  </strong>
                </p>
              )}
              {errors.cpassword?.type === "required" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Please enter your Password
                  </strong>
                </p>
              )}
              {errors.cpassword?.type === "minLength" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Password should be minimum 8 characters long
                  </strong>
                </p>
              )}
              {errors.cpassword?.type === "maxLength" && (
                <p className="text-danger">
                  <strong className="text-danger">
                    Password can be maximum 16 characters long
                  </strong>
                </p>
              )}
              <FloatingLabel
                className="mb-3 row"
                controlId="formCpassword"
                label={cpasswordlabel}
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  {...register("cpassword", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  })}
                />
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
    console.log(userObj["currpass"]);
    setOldpassword(userObj["currpass"]);

    if (oldpassword === localStorage.password) {
      setPage(1);
    } else alert("Entered password does not match your current password");
    /*  setPage(1);
      //console.log(userObj["username"]);
      alert("User Available");
      setOldpassword(userObj["username"]);
  
      console.log(username);
      console.log(page);
   */
  };

  const onVerifyOtp = (userObj) => {
    console.log(userObj["otp"]);
    if (userObj["otp"] === "111111") {
      // alert("OTP entered is correct. User is verified");
      setPage(page + 1);
    } else {
      alert("OTP entered is incorrect");
    }
    console.log(page);
  };

  const onPasswordSubmit = (userObj) => {
    console.log(userObj["currpass"]);
    console.log(userObj["password"]);
    console.log(userObj["cpassword"]);

    if (userObj["password"] === userObj["cpassword"]) {
      axios
        .put("http://localhost:8083/api/auth/reset", {
          //userName: userObj["username"],
          userName: localStorage.username,
          password: userObj["password"],
        })
        .then((res) => {
          console.log(res);
          //localStorage.token = `Bearer ${res.data.jwttoken}`;
          // setOldpassword(userObj["username"]);
          //localStorage.isLoggedIn = true;

          //window.location = "/";
          alert("Password changed successfully");
          window.location = "/";
        })
        .catch((e) => {
          console.log(e.response.data);
          alert("Password could not be changed , some error occured");
          setPage(0);
        });
    } else {
      alert("Passwords don't match");
    }

    setPassword(userObj["password"]);
  };

  return (
    <>
      <section class="h-100 gradient-form" style={{ background: "#c5e5ff" }}>
        <div class="container py-5 h-100">
          <p
            className="text-center display-5"
            style={{
              fontWeight: "700",
              fontFamily: "Libre Baskerville",
              marginBottom: "50px",
            }}
          >
            Reset Password
          </p>
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-xl-6">
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
                    <p className="text-secondary" style={{ fontSize: "15px" }}>
                      <span className="text-danger">
                        <b>*</b>
                      </span>{" "}
                      Mandatory Fields
                    </p>
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
                        <strong className="text-danger" className="text-white">Next</strong>
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
