// import Footer from "./Footer";

import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Menu from "./Menu";

function Modifyinterest() {
  const typelabel = (
    <>
      Select the loan type to modify the interest{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );
  const roilabel = (
    <>
      Define Rate of interest for the selected loan type{" "}
      <span className="text-danger">
        <b>*</b>
      </span>{" "}
    </>
  );
  const onFormSubmit = (rateObj) => {
    console.log(rateObj);
    if (rateObj.name === "homeloan") rateObj.id = 3;
    else if (rateObj.name === "personalloan") rateObj.id = 1;
    else rateObj.id = 2;
    console.log(rateObj);
    axios
      .put("http://localhost:8083/updateInterest", rateObj, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.demo}`,
        },
      })
      .then((res) => {
        console.log(res);

        alert("Loan interest modified successfully");
      })
      .catch((e) => {
        console.log(e.response.data);
        console.log(e);
        alert("Could not modify the loan interest. Error Occured");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Container
        fluid
        className="Admin-registration"
        style={{ paddingTop: "30px", paddingBottom: "3%" }}
      >
        <Menu />
        <Row
          className="d-flex justify-content-center w-100 align-items-center"
          style={{
            marginLeft: "1%",
            marginRight: "3%",
            marginTop: "-1%",
          }}
        >
          <Col className="my-1">
            <Card
              style={{
                border: "1px solid #000",
                backgroundColor: "#ededf2",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginLeft: "10%",
                marginRight: "10%",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset",
              }}
            >
              <Card.Body
                className="px-4"
                style={{ paddingLeft: "50%", paddingRight: "20%" }}
              >
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                  <p className="h3 my-4" style={{ color: "#093d65" }}>
                    <b>Modify Loan Interest Rates</b>
                  </p>

                  <Row className="align-items-center">
                    <Form.Group
                      className="mb-3 pt-3"
                      controlId="formBasicLoanType"
                    >
                      <Col md="10" className="mx-auto mt-3">
                        {errors.loantype?.type === "required" && (
                          <p className="text-danger">
                            {" "}
                            <strong>Please select a loan type</strong>{" "}
                          </p>
                        )}
                        <FloatingLabel
                          className="mb-1"
                          controlId="formLoanType"
                          label={typelabel}
                        >
                          <Form.Select
                            type="number"
                            placeholder="Select Loan type"
                            defaultValue={"homeloan"}
                            {...register("name", { required: true })}
                          >
                            <option value={"homeloan"}>Home Loan</option>
                            <option value={"personalloan"}>
                              Personal Loan
                            </option>
                            <option value={"educationloan"}>
                              Education Loan
                            </option>
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center pt-4">
                    <Form.Group className="mb-3" controlId="formBasicRate">
                      <Col md="10" className="mx-auto mt-3">
                        {errors.interestrate?.type === "required" && (
                          <p className="text-danger">
                            {" "}
                            <strong>Please enter the rate value.</strong>{" "}
                          </p>
                        )}
                        {errors.interestrate?.type === "min" && (
                          <p className="text-danger">
                            {" "}
                            <strong>
                              Interest rate should not be lower than 8.
                            </strong>{" "}
                          </p>
                        )}
                        {errors.interestrate?.type === "max" && (
                          <p className="text-danger">
                            {" "}
                            <strong>
                              Interest rate should not be higher than 25.
                            </strong>{" "}
                          </p>
                        )}
                        <FloatingLabel
                          className="mb-3"
                          controlId="formTenure"
                          label={roilabel}
                        >
                          <Form.Control
                            type="number"
                            placeholder="Enter Rate"
                            {...register("interest", {
                              required: true,
                              min: 8,
                              max: 25,
                            })}
                          />
                        </FloatingLabel>
                      </Col>
                    </Form.Group>
                  </Row>

                  <center>
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-25 my-4"
                    >
                      Update Rate
                    </Button>
                  </center>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Footer /> */}
    </>
  );
}

export default Modifyinterest;
