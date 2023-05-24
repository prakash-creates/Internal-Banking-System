import {
  Button,
  Form,
  Table,
  Card,
  FloatingLabel,
  Row,
  Col,
  Modal,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./AdminViewloan.css";
import { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";

import axios from "axios";
import Menu from "./Menu";
function AdminViewloan() {
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

  const someData = [
    {
      id: 1,
      amount: 50000,
      duration: 8,
      applyDate: "2022-10-12",
      loan_id: {
        name: "Education Loan",
        interest: 10,
        id: 2,
      },
      courseName: "B Tech",
      courseFee: 120000,
      permanentAddress: "something street",
      designation: "Associate",
      totalExperience: 20,
    },
    {
      id: 2,
      amount: 150000,
      duration: 6,
      applyDate: "2022-12-12",
      loan_id: {
        name: "Personal Loan",
        interest: 12,
        id: 1,
      },
      designation: "Associate",
      totalExperience: 20,
    },
    {
      id: 5,
      amount: 200000,
      duration: 12,
      applyDate: "2022-10-10",
      loan_id: {
        name: "Home Loan",
        interest: 13,
        id: 3,
      },
      permanentAddress: "something street",
    },
    {
      id: 7,
      amount: 70000,
      duration: 8,
      applyDate: "2022-10-12",
      loan_id: {
        name: "Education Loan",
        interest: 10,
        id: 2,
      },
      courseName: "B Tech",
      courseFee: 120000,
    },
  ];

  const [editable, setEditable] = useState(true);

  const [showOld, setshowOld] = useState(true);

  const [tempp, setTempp] = useState(0);

  const counter = useRef(0);

  const alive = useRef(false);

  const [dup, setDup] = useState(0);

  const [data, setLoanData] = useState([]); //To change this for backend integrations.

  /* Dividing the loan records based on loan type */
  const [homeloanData, setHomeloanData] = useState([]);
  const [personalloanData, setPersonalloanData] = useState([]);
  const [educationloanData, setEducationloanData] = useState([]);

  /* const [loanInterest, setInterest] = useState(10);

  const setRate = (idVal) => {
      if(idVal === 1)
          setInterest(12);
      else if(idVal === 2)
          setInterest(11);
      else if(idVal === 3)
          setInterest(9);
  } */

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loanid: "1",
    },
  });

  const onFormSubmit = (userObj) => {
    //console.log(modalData);
    setValue("loanid", modalData.id);
    userObj.loanid = modalData.id;
    //console.log(localStorage.demo);
    console.log(userObj);

    //Parsing the data to integer.
    userObj.duration = parseInt(userObj.duration);

    let ObjToPass;
    let iter = 0;

    data.forEach((element) => {
      iter = iter + 1;
      if (element.id === userObj.loanid) {
        console.log("This should be the correct JSON element to pass", element);
        ObjToPass = element;
      }
    });
    console.log("ObjToPass", ObjToPass);
    console.log(userObj["duration"]);
    ObjToPass.duration = userObj.duration;

    console.log(userObj);

    console.log("The json object to be passed to backend is ", ObjToPass);
    console.log(localStorage.token);

    //Calculating Monthly EMI :
    //console.log("Monthly EMI : " + LoanEmi(rateOfInterest, userObj.amount, userObj.duration));

    //To submit the loan applied by the user
    axios
      .put(
        "http://localhost:8083/updateLoan/" + localStorage.username,
        ObjToPass,
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
        changeState();
        alert("Loan details modified successfully");
      })
      .catch((e) => {
        console.log(e.response.data);
        console.log(e);
        alert("Could not modify the loan details. Error Occured");
      });
  };

  function changeState() {
    setshowOld(!showOld);
    setEditable(!editable);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8083/getAllLoanDetails/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.demo}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        setLoanData(res.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Could not fetch the loan details");
      });
    //console.log(localStorage.token);
    //console.log(localStorage.demo);

    var edu = [];
    var pers = [];
    var home = [];
    data.forEach((element) => {
      //console.log(element);
      if (element.loan_id.id === 1) {
        pers.push(element);
      } else if (element.loan_id.id === 2) {
        edu.push(element);
      } else {
        home.push(element);
      }
    });
    //console.log(edu);
    //console.log(pers);
    console.log(home);
    setEducationloanData(edu);
    setHomeloanData(home);
    setPersonalloanData(pers);
  }, [tempp]);

  // useEffect(() => {
  //   if (counter.current < 10) {
  //     counter.current += 1;
  //     const timer = setTimeout(() => setTempp({ num: tempp.num + 1 }), 10000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [data]);

  const refresh = () => {
    console.log(data);

    var edu = [];
    var pers = [];
    var home = [];
    data.forEach((element) => {
      console.log(element);
      if (element.loan_id.id === 1) {
        pers.push(element);
      } else if (element.loan_id.id === 2) {
        edu.push(element);
      } else {
        home.push(element);
      }
    });
    console.log(edu);
    console.log(pers);
    console.log(home);
    setEducationloanData(edu);
    setHomeloanData(home);
    setPersonalloanData(pers);
  };
  //To define the data to be shown in modal

  const [modalData, setModalData] = useState({});

  const onButtonClick = (someObj) => {
    //console.log(someObj);
    //localStorage.idForLoanChange = someObj.id;
    alert(someObj.amount);
    setModalData(someObj);
    //console.log(modalData);
    handleShow();
  };

  //For conditional rendering of tables
  const [status, setStatus] = useState(1);

  const radioHandler = (status) => {
    setStatus(status);
  };

  //For modal window edit tenure section
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    register("loanid");
    console.log(modalData);
  }, [register]);

  useEffect(() => {
    console.log(data);
    register("loanid", modalData.id);
    console.log("modalData is probably changed by now");
    console.log(modalData);
  }, [modalData]);

  return (
    <>
      <Container
        fluid
        className="Admin-registration"
        style={{ paddingTop: "30px", paddingBottom: "3%" }}
      >
        <Menu />
        <div
          className="admin-viewloan-main"
          style={{
            paddingBottom: "1em",
            backgroundColor: "#0c4978",
            marginLeft: "2%",
          }}
        >
          {/*  <h2
            style={{
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
              color: "#fff",
              fontWeight: "700",
              fontFamily: "Libre Baskerville",
            }}
          >
            My Loans
          </h2> */}

          <div
            className="container"
            style={{
              background: "#3876a6",
              color: "#fff",
              fontSize: "20px",
              margin: "20px auto",
              fontWeight: "700",
              border: "1px solid #0c4978",
            }}
          >
            <Form>
              <div className="mb-3 mt-3">
                <Form.Check
                  inline
                  name="loanType"
                  type="radio"
                  id={`default-radio`}
                  checked={status === 1}
                  onClick={(e) => radioHandler(1)}
                  label="Home Loan"
                />
                <Form.Check
                  inline
                  name="loanType"
                  type="radio"
                  id={`default-radio`}
                  checked={status === 2}
                  onClick={(e) => radioHandler(2)}
                  label="Personal Loan"
                />
                <Form.Check
                  inline
                  name="loanType"
                  type="radio"
                  id={`default-radio`}
                  checked={status === 3}
                  onClick={(e) => radioHandler(3)}
                  label="Education Loan"
                />
              </div>
            </Form>
          </div>
          <Button
            id="reload"
            className="reload mb-3"
            type="button"
            onClick={refresh}
          >
            Update Records
          </Button>
          {status === 1 && (
            <div
              className="table-responsive container"
              style={{
                height: "35em",
                overflow: "scroll",
                border: "1px solid #000",
                padding: "2px",
                marginBottom: "4em",
                backgroundColor: "#fafafa",
              }}
            >
              <Table
                striped
                bordered
                hover
                style={{ fontSize: "1em", padding: "1em", width: "100%" }}
              >
                <thead
                  className="thead-dark"
                  style={{
                    color: "#fff",
                    backgroundColor: "#212529",
                    borderColor: "#32383e",
                    position: "sticky",
                    top: "0px",
                  }}
                >
                  <tr
                    style={{
                      border: "1px solid #fff",
                      borderBottomWidth: "2px",
                    }}
                  >
                    <th colSpan={10}>Home Loan</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th style={{ width: "20em" }}>Loan Id</th>
                    <th style={{ width: "20em" }}>User Id</th>
                    <th style={{ width: "20em" }}>User's Name</th>
                    {/* <th style={{ width: "20em" }}>Loan Type</th> */}
                    <th style={{ width: "20em" }}>Loan Amount</th>
                    <th style={{ width: "20em" }}>Loan Tenure</th>
                    {/* <th style={{ width: "20em" }}>Expected Monthly EMI</th> */}
                    <th style={{ width: "20em" }}>Apply Date</th>
                    <th style={{ width: "20em" }}>Loan End Date</th>
                    
                    {/* <th style={{ width: "5em" }}>
                      <FaEdit size={20} />
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {homeloanData?.map((item, i) => (
                    <tr key={i} style={{ fontWeight: "600", fontSize: "16px" }}>
                      <td>{i + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.user_id.id}</td>
                      <td>{item.user_id.name}</td>
                      
                      <td>&#8377; &nbsp;{item.amount}</td>
                      <td>{item.duration + " Years"}</td>
                      {/* <td>
                        &#8377; &nbsp;
                        {LoanEmi(
                          item.loan_id.interest,
                          item.amount,
                          item.duration
                        )}
                      </td> */}
                      <td>{item.applyDate}</td>
                      <td>{item.endDate}</td>
                      
                      {/* <td>
                        <Button key={i} onClick={() => onButtonClick(item)}>
                          <FaEdit size={20} />
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {status === 2 && (
            <div
              className="table-responsive container"
              style={{
                height: "35em",
                overflow: "scroll",
                border: "1px solid #000",
                padding: "2px",
                marginBottom: "4em",
                backgroundColor: "#fafafa",
              }}
            >
              <Table
                striped
                bordered
                hover
                style={{ fontSize: "1em", padding: "1em", width: "100%" }}
              >
                <thead
                  className="thead-dark"
                  style={{
                    color: "#fff",
                    backgroundColor: "#212529",
                    borderColor: "#32383e",
                    position: "sticky",
                    top: "0px",
                  }}
                >
                  <tr
                    style={{
                      border: "1px solid #fff",
                      borderBottomWidth: "2px",
                    }}
                  >
                    <th colSpan={11}>Personal Loan</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th style={{ width: "20em" }}>Loan Id</th>
                    <th style={{ width: "20em" }}>User Id</th>
                    <th style={{ width: "20em" }}>User's Name</th>
                    {/* <th style={{ width: "20em" }}>Loan Type</th> */}
                    <th style={{ width: "20em" }}>Loan Amount</th>
                    <th style={{ width: "20em" }}>Loan Tenure</th>
                    {/* <th style={{ width: "20em" }}>Expected Monthly EMI</th> */}
                    <th style={{ width: "20em" }}>Apply Date</th>
                    <th style={{ width: "20em" }}>Loan End Date</th>
                    
                    {/* <th style={{ width: "5em" }}>
                      <FaEdit size={20} />
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {personalloanData?.map((item, i) => (
                    <tr key={i} style={{ fontWeight: "600", fontSize: "16px" }}>
                      <td>{i + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.user_id.id}</td>
                      <td>{item.user_id.name}</td>
                      
                      <td>&#8377; &nbsp;{item.amount}</td>
                      <td>{item.duration + " Years"}</td>
                      {/* <td>
                        &#8377; &nbsp;
                        {LoanEmi(
                          item.loan_id.interest,
                          item.amount,
                          item.duration
                        )}
                      </td> */}
                      <td>{item.applyDate}</td>
                      <td>{item.endDate}</td>
                    
                      {/* <td>
                        <Button key={i} onClick={() => onButtonClick(item)}>
                          <FaEdit size={20} />
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {status === 3 && (
            <div
              className="table-responsive container"
              style={{
                height: "35em",
                overflow: "scroll",
                border: "1px solid #000",
                padding: "2px",
                marginBottom: "4em",
                backgroundColor: "#fafafa",
              }}
            >
              <Table
                striped
                bordered
                hover
                style={{ fontSize: "1em", padding: "1em", width: "100%" }}
              >
                <thead
                  className="thead-dark"
                  style={{
                    color: "#fff",
                    backgroundColor: "#212529",
                    borderColor: "#32383e",
                    position: "sticky",
                    top: "0px",
                  }}
                >
                  <tr
                    style={{
                      border: "1px solid #fff",
                      borderBottomWidth: "2px",
                    }}
                  >
                    <th colSpan={11}>Education Loan</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th style={{ width: "20em" }}>Loan Id</th>
                    <th style={{ width: "20em" }}>User Id</th>
                    <th style={{ width: "20em" }}>User's Name</th>
                    {/* <th style={{ width: "20em" }}>Loan Type</th> */}
                    <th style={{ width: "20em" }}>Loan Amount</th>
                    <th style={{ width: "20em" }}>Loan Tenure</th>
                    {/* <th style={{ width: "20em" }}>Expected Monthly EMI</th> */}
                    <th style={{ width: "20em" }}>Apply Date</th>
                    <th style={{ width: "20em" }}>Loan End Date</th>
                   
                    {/* <th style={{ width: "5em" }}>
                      <FaEdit size={20} />
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {educationloanData?.map((item, i) => (
                    <tr key={i} style={{ fontWeight: "600", fontSize: "16px" }}>
                      <td>{i + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.user_id.id}</td>
                      <td>{item.user_id.name}</td>
                      
                      <td>&#8377; &nbsp;{item.amount}</td>
                      <td>{item.duration + " Years"}</td>
                      {/* <td>
                        &#8377; &nbsp;
                        {LoanEmi(
                          item.loan_id.interest,
                          item.amount,
                          item.duration
                        )}
                      </td> */}
                      <td>{item.applyDate}</td>
                      <td>{item.endDate}</td>
                      
                      {/* <td>
                        <Button key={i} onClick={() => onButtonClick(item)}>
                          <FaEdit size={20} />
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
        {/* <Footer /> */}
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Loan Tenure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <p className="mx-auto mt-3 text-center">
                  <b>Loan Details</b>
                </p>
                <Row className="align-items-center">
                  <Col className="mx-auto" xs={6} md={4}>
                    Loan Id :
                  </Col>
                  <Col className="mx-auto" xs={6} md={4}>
                    {modalData.id}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col className="mx-auto" xs={6} md={4}>
                    Loan Tenure :
                  </Col>
                  <Col className="mx-auto" xs={6} md={4}>
                    {modalData.duration} Years
                  </Col>
                </Row>
                {/* <Row className='align-items-center'>
                      <Col className='mx-auto' xs={6} md={4}>
                      Loan Type : 
                      </Col>
                      <Col className='mx-auto' xs={6} md={4}>
                      {modalData.loan_id.name}
                      </Col>
                  </Row>
                  <Row className='align-items-center'>
                      <Col className='mx-auto' xs={6} md={4}>
                      Monthly EMI : 
                      </Col>
                      <Col className='mx-auto' xs={6} md={4}>
                      {LoanEmi(modalData.loan_id.interest, modalData.amount, modalData.duration)}
                      </Col>
                  </Row> */}
                <Row className="align-items-center">
                  <Col className="mx-auto" xs={6} md={4}>
                    Loan Amount :
                  </Col>
                  <Col className="mx-auto" xs={6} md={4}>
                    {modalData.amount}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col className="mx-auto" xs={6} md={4}>
                    Applied On :
                  </Col>
                  <Col className="mx-auto" xs={6} md={4}>
                    {modalData.applyDate}
                  </Col>
                </Row>

                {modalData.id}
                <Form autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="align-items-center mx-auto">
                    <Col className="mx-auto" xs={6} md={4}>
                      New Tenure :
                    </Col>
                    <Col className="mx-auto mt-3" xs={12} md={8}>
                      <Form.Group className="mb-3" controlId="formBasicTenure">
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
                        <FloatingLabel
                          className="mb-3"
                          controlId="formTenure"
                          label="Tenure of loan (in years)"
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
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="align-items-center pt-4">
                    <Form.Group className="mb-3" controlId="formBasicTenure">
                      <Col md="10" className="mx-auto mt-3"></Col>
                    </Form.Group>
                  </Row>
                  <Button id="save" variant="danger" type="submit">
                    <span style={{ fontSize: "1.5em" }}>Update</span>
                  </Button>
                </Form>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Understood
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </>
  );
}

export default AdminViewloan;