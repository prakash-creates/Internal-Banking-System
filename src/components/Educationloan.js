import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Educationloan() {
  //const [duration, setDuration] = useState(2); //Required to set course duration, if required
  const rateOfInterest = 12;

  const LoanEmi = (rateValue, amountValue, tenureValue) => {
    let rate = rateValue / 1200; // Rate of interest applicable for monthly EMI is first converted to monthly EMI rate.

    return Math.round(
      (amountValue * rate * (1 + rate) ** (12 * tenureValue)) /
        ((1 + rate) ** (12 * tenureValue) - 1)
    );

    /* 
        Formula used for calculating montly EMI is :

            P x R x (1+R)^N / [(1+R)^N-1]

            Where,

            P = Principal amount of the loan
            R = Rate of interest
            N = Number of monthly instalments.
        */
  };

  const loanamtlabel = (
    <>
      Enter Loan Amount{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );

  const loantenurelabel = (
    <>
      Tenure of Loan (in years){" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );

  const annualsalary = (
    <>
      Enter Annual Salary{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );
  const [loanid, setLoanid] = useState({});
  const [maxAmt, setMaxAmt] = useState(10000000);


  useEffect(() => {
      var role_one = ["Programmer Analyst Trainee", "Programmer Analyst", "Associate"];
      var role_two = ["Sr. Manager ", "Sr. Associate", "Manager"];
      var role_three = ["Associate Director", "Director"];
      var role_four= ["Sr. Director", "Vice President"];
  
     
      if (role_one.indexOf(localStorage.designation) !== -1)
      {
          setMaxAmt(2500000);
      }
      if (role_two.indexOf(localStorage.designation) !== -1)
      {
          setMaxAmt(5000000);
      }
      if (role_three.indexOf(localStorage.designation) !== -1)
      {
          setMaxAmt(7500000);
      }
      if (role_four.indexOf(localStorage.designation) !== -1)
      {
          setMaxAmt(10000000);
      }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (userObj) => {
    console.log(localStorage.demo);

    
    //Calculating Monthly EMI :
    console.log(
      "Monthly EMI : " +
        LoanEmi(rateOfInterest, userObj.amount, userObj.duration)
    );
    

    userObj.loan_id = loanid;
    console.log(loanid);

    //Parsing the data to integer.

    userObj.amount = parseInt(userObj.amount);
    userObj.duration = parseInt(userObj.duration);
    userObj.courseFee = parseInt(userObj.courseFee);

    //To use this when using backend APIs.
    //userObj.monthlyEmi = LoanEmi(userObj.loan_id.interest, userObj.amount, userObj.duration);
    userObj.monthlyEmi = LoanEmi(rateOfInterest, userObj.amount, userObj.duration);

    console.log(userObj["amount"]);
    console.log(userObj["duration"]);
    console.log(userObj["courseFee"]);
    console.log(userObj["monthlyEmi"]);

    console.log(userObj);
    console.log(localStorage.token);

    

    //To submit the loan applied by the user
    axios
      .post(
        "http://localhost:8083/applyLoan/" + localStorage.username,
        userObj,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.demo}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location = "/viewloan";
        alert("Loan applied successfully");
      })
      .catch((e) => {
        console.log(e.response.data);
        console.log(e);
        alert(e.response.data.message);
      });
  };

  useEffect(() => {
    //To get the json object containing id, rate and name of the loan.
    axios
      .get("http://localhost:8083/getAllLoanTypes", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.demo}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoanid(res.data[1]); // To change the index as per the loan type
      })
      .catch((e) => {
        console.log(e.response.data);
        alert("Error getting the loan id object.");
      });
  }, []);

  var today = new Date();
  const dd = ("0" + today.getDate()).slice(-2);
  const mm = ("0" + (today.getMonth() + 1)).slice(-2);
  const yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col lg="9" className="my-3">
            <h1
              className="text-dark mb-4"
              style={{
                fontFamily: "Libre Baskerville",
                textTransform: "capitalize",
              }}
            >
              Apply for Education loan
            </h1>

            <Card
              style={{
                border: "1px solid #000",
                backgroundColor: "#F2F3F4",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset",
              }}
            >
              <Card.Body className="px-4">
                <Form autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="align-items-center pt-4">
                    <Form.Group className="mb-3" controlId="formBasicAmount">
                      <Col md="10" className="mx-auto">
                        <FloatingLabel
                          controlId="formAmount"
                          label={loanamtlabel}
                        >
                          <Form.Control
                            type="number"
                            placeholder="Enter Amount"
                            {...register("amount", {
                              required: true,
                              min: 100000,
                              max: maxAmt,
                            })}
                          />
                        </FloatingLabel>
                        {errors.amount?.type === "required" && (
                          <p className="text-danger">
                            <strong className="text-danger">Please enter the loan amount</strong>
                          </p>
                        )}
                        {errors.amount?.type === "min" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Loan can be issued for an amount of 1,00,000 and
                              above
                            </strong>
                          </p>
                        )}
                        {errors.amount?.type === "max" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Loan can be issued for a maximum value of
                              {maxAmt}
                            </strong>
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Col md="10" className="mx-auto ">
                        <FloatingLabel
                          controlId="formTenure"
                          label="Application Date"
                        >
                          <Form.Control
                            type="date"
                            defaultValue={today}
                            {...register("applyDate", { required: true })}
                            readOnly
                          />
                        </FloatingLabel>
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center ">
                    <Form.Group className="mb-3" controlId="formBasicTenure">
                      <Col md="10" className="mx-auto ">
                        <FloatingLabel
                          controlId="formTenure"
                          label={loantenurelabel}
                        >
                          <Form.Control
                            type="number"
                            placeholder="Enter Tenure"
                            {...register("duration", {
                              required: true,
                              min: 4,
                              max: 15,
                            })}
                          />
                        </FloatingLabel>
                        {errors.duration?.type === "required" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Please enter the expected tenure of the loan
                            </strong>
                          </p>
                        )}
                        {errors.duration?.type === "min" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Loan tenure should be a minimum of 4 years
                            </strong>
                          </p>
                        )}
                        {errors.duration?.type === "max" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Loan cannot be issued for more than 15 years
                            </strong>
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center ">
                    <Form.Group className="mb-3" controlId="formBasicSalary">
                      <Col md="10" className="mx-auto ">
                        <FloatingLabel
                          controlId="formAmount"
                          label={annualsalary}
                        >
                          <Form.Control
                            type="number"
                            placeholder="Enter Amount"
                            {...register("annualIncome", {
                              required: true,
                              min: 250000,
                              max: 4000000,
                            })}
                          />
                          <Form.Text className="text-muted">
                            The entered salary is subject to verification from
                            the authorities.
                          </Form.Text>
                        </FloatingLabel>
                        {errors.annualIncome?.type === "required" && (
                          <p className="text-danger">
                            <strong className="text-danger">Please enter your annual income</strong>
                          </p>
                        )}
                        {errors.annualIncome?.type === "min" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Your organization's lowest pay is 2,50,000
                            </strong>
                          </p>
                        )}
                        {errors.annualIncome?.type === "max" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Your organization's highest pay is 40,00,000
                            </strong>
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCourse">
                      <Col md="10" className="mx-auto">
                        <FloatingLabel
                          controlId="formTenure"
                          label="Select the academic course for loan"
                        >
                          <Form.Select
                            type="number"
                            placeholder="Enter Course"
                            defaultValue={"PG Course"}
                            {...register("courseName", {
                              required: true,
                              min: 22000,
                              max: 150000,
                            })}
                          >
                            <option value="UG Course">UG Course</option>
                            <option value="PG Course">PG Course</option>
                            <option value="Diploma Course">
                              Diploma Course
                            </option>
                            <option value="Professional Certification Course">
                              Professional Certification Course
                            </option>
                          </Form.Select>
                        </FloatingLabel>
                        {errors.courseName?.type === "required" && (
                          <p className="text-danger">
                            <strong className="text-danger">Please select the academic course</strong>
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center ">
                    <Form.Group className="mb-3" controlId="formBasicCourseFee">
                      <Col md="10" className="mx-auto ">
                        <FloatingLabel
                          controlId="formAmount"
                          label="Enter Course Fee"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Enter Amount"
                            {...register("courseFee", {
                              required: true,
                              min: 50000,
                              max: 5000000,
                            })}
                          />
                        </FloatingLabel>
                        {errors.courseFee?.type === "required" && (
                          <p className="text-danger">
                            <strong className="text-danger">Please enter the course fee</strong>
                          </p>
                        )}
                        {errors.courseFee?.type === "min" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Course fee should be more than 50,000
                            </strong>
                          </p>
                        )}
                        {errors.courseFee?.type === "max" && (
                          <p className="text-danger">
                            <strong className="text-danger">
                              Course fee should be below 50,00,000
                            </strong>
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center justify-content-start">
                    <Form.Group
                      className="mb-3 text-left"
                      controlId="formBasicCourseFee"
                    >
                      <Col md="10" className="mx-auto text-left">
                        <Form.Label
                          controlId="formAmount"
                          label="Upload fee document"
                          className="text-left"
                        >
                          Upload Fee Schedule of the Institute
                        </Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="PDF or Image file only"
                          multiple
                          accept="application/pdf, image/png"
                        />
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center justify-content-start">
                    <Form.Group
                      className="mb-3 text-left"
                      controlId="formBasicCourseFee"
                    >
                      <Col md="10" className="mx-auto text-left">
                        <Form.Label
                          controlId="formAmount"
                          label="Upload admission letter"
                          className="text-left"
                        >
                          Upload Admission letter of the Institute
                        </Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="application/pdf"
                        />
                      </Col>
                    </Form.Group>
                  </Row>

                  {/* <Row className='align-items-center'>

                    <Form.Group as={Row} controlId="CourseValue" className="mb-3 mt-3" style={{"border" : "1px solid #999", "marginLeft" : "1px", "marginRight" : "1%", "borderRadius" : "5px", "padding" : "2% 0%"}}>
                        <Form.Label><h6>Course Duration</h6></Form.Label>
                        <Col xs="9">
                            <Form.Range defaultValue={2} min={2} max={6} controlId={"CourseValue"} value={duration} onChange={e => setDuration(e.target.value)} tooltip="on"/>
                        </Col>
                        <Col xs="3">
                            <Form.Control defaultValue={2} controlId={"CourseValue"} value={duration} readOnly/>
                        </Col>
                        <Form.Text disabled>Course Duration can be 2 years to 6 years</Form.Text>
                    </Form.Group>

                </Row>

                <hr className="mx-3" style={{"borderWidth" : "3px"}} /> */}

                  {/* <Form.Text className="mb-3">
                    <p className="h6">
                      ** You will be contacted by our officials, regarding the
                      mortgage documents for the loan.
                    </p>
                  </Form.Text> */}

                  <Button type="submit" className="my-4 w-50" size="lg">
                    Apply
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Educationloan;
