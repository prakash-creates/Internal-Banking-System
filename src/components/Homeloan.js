import {Container, Row, Col, Card, Form, Button, FloatingLabel} from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Homeloan()
{

    const rateOfInterest = 11;

    const LoanEmi = (rateValue, amountValue, tenureValue) => {

        let rate = rateValue/1200; // Rate of interest applicable for monthly EMI is first converted to monthly EMI rate.

        return Math.round(amountValue * rate * ((1+rate) ** (12*tenureValue)) / (((1+rate) ** (12*tenureValue)) - 1) );

        /* 
        Formula used for calculating montly EMI is :

            P x R x (1+R)^N / [(1+R)^N-1]

            Where,

            P = Principal amount of the loan
            R = Rate of interest
            N = Number of monthly instalments.
        */

    };

    const [loanid, setLoanid]=useState({});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = (userObj) => 
    {
        console.log(localStorage.demo);

        //Parsing the data to integer.

        userObj.amount = parseInt(userObj.amount);
        userObj.duration = parseInt(userObj.duration);
        userObj.annualIncome = parseInt(userObj.annualIncome);

        console.log(userObj["amount"]);
        console.log(userObj["duration"]);
        console.log(userObj["annualIncome"]);

        console.log(userObj);
        console.log(localStorage.token);

        //Calculating Monthly EMI : 
        console.log("Monthly EMI : " + LoanEmi(rateOfInterest, userObj.amount, userObj.duration));
        
        userObj.loan_id = loanid;
        console.log(loanid);
            
        //To submit the loan applied by the user 
        axios
            .post("http://localhost:8083/applyLoan/"+localStorage.username, userObj,
            {
                headers: 
                {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.demo}`,
                }
            } )
            .then((res) => {
                console.log(res);
                window.location = "/viewloan";
                alert("Loan applied successfully");
            })
            .catch((e) => {
                console.log(e.response.data);
                console.log(e);
                alert("Cannot apply for the loan");
            });
    };

    useEffect(() => {
        //To get the json object containing id, rate and name of the loan.
        axios
            .get("http://localhost:8083/getAllLoanTypes", 
            {
                headers: 
                {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${localStorage.demo}`
                }
            },
            )
            .then((res) => {
                console.log(res.data);
                setLoanid(res.data[2]);
            })
            .catch((e) => {
                console.log(e.response.data);
                alert("Error getting the loan id object.");
            }); 
    }, []);

    var today = new Date();
    const dd = ("0" + (today.getDate())).slice(-2);
    const mm = ("0" + (today.getMonth() + 1)).slice(-2);
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd ;

    return(
        <>
        <Container fluid>

        <Row className='d-flex justify-content-center align-items-center'>
        <Col lg='9' className='my-5'>

            <h1 className="text-dark mb-4">Apply for home loan</h1>

            <Card style={{"border" : "1px solid #000", "backgroundColor" : "#F2F3F4", "boxShadow" : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset"}}>
            <Card.Body className='px-4'>

            <Form autoComplete='off' onSubmit={handleSubmit(onFormSubmit)}>

            <hr className="mx-3" style={{"borderWidth" : "3px"}} />

            <Form.Text className='mb-3'>
                <p className='h4'>Generic Details</p>
            </Form.Text>

            <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center'>
                    <Form.Group className="mb-3 pt-3" controlId="formBasicTenure">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-1" controlId="formTenure" label="Type of Loan">
                                <Form.Select type="number" placeholder="Enter Tenure" defaultValue={"Home loan"} disabled>
                                    <option defaultChecked>Home Loan</option>
                                    <option>Personal Loan</option>
                                    <option>Education Loan</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>

                    </Form.Group>
                </Row>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicAmount">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formAmount" label="Enter Loan Amount">
                                <Form.Control type="number" placeholder="Enter Amount"  {...register("amount", {required: true, min: 100000, max: 10000000})} />
                            </FloatingLabel>
                            {errors.amount?.type === "required" && (<p className="text-danger"><strong>Please enter the loan amount</strong></p>)}
                            {errors.amount?.type === "min" && (<p className="text-danger"><strong>Loan can be issued for an amount of 1,00,000 and above</strong></p>)}
                            {errors.amount?.type === "max" && (<p className="text-danger"><strong>Loan can be issued for a maximum value of 1,00,00,000</strong></p>)}
                        </Col>

                    </Form.Group>
                </Row>

                <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicDate">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formTenure" label="Application Date">
                                <Form.Control type="date" defaultValue={today} {...register("applyDate", {required: true})} readOnly/>
                            </FloatingLabel>
                        </Col>

                    </Form.Group>
                </Row>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicTenure">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formTenure" label="Tenure of loan (in years)">
                                <Form.Control type="number" placeholder="Enter Tenure" {...register("duration", {required: true, min: 4, max: 15})} />
                            </FloatingLabel>
                            {errors.duration?.type === "required" && (<p className="text-danger"><strong>Please enter the expected tenure of the loan</strong></p>)}
                            {errors.duration?.type === "min" && (<p className="text-danger"><strong>Loan tenure should be a minimum of 4 years</strong></p>)}
                            {errors.duration?.type === "max" && (<p className="text-danger"><strong>Loan cannot be issued for more than 15 years</strong></p>)}
                        </Col>

                    </Form.Group>
                </Row>

                <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicSalary">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formAmount" label="Enter Annual Salary">
                                <Form.Control type="number" placeholder="Enter Amount" {...register("annualIncome", {required: true, min: 250000, max: 4000000})} />
                                <Form.Text className='text-muted'>The entered salary is subject to verification from the authorities.</Form.Text>
                            </FloatingLabel>
                            {errors.annualIncome?.type === "required" && (<p className="text-danger"><strong>Please enter your annual income</strong></p>)}
                            {errors.annualIncome?.type === "min" && (<p className="text-danger"><strong>Your organization's lowest pay is 2,50,000</strong></p>)}
                            {errors.annualIncome?.type === "max" && (<p className="text-danger"><strong>Your organization's highest pay is 40,00,000</strong></p>)}
                        </Col>

                    </Form.Group>
                </Row>

                <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                    <Form.Text className='mb-3'>
                        <p className='h4'>Loan Specific Details</p>
                    </Form.Text>

                <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicAddress">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formAddress" label="Enter the address of the property">
                                <Form.Control as="textarea" placeholder="Enter address" style={{ height: '100px' }} {...register("permanentAddress", {required: true, maxLength: 300})} />
                            </FloatingLabel>
                            {errors.address?.type === "required" && (<p className="text-danger"><strong>Please enter the address of the property.</strong></p>)}
                            {errors.address?.type === "maxLength" && (<p className="text-danger"><strong>Enter the address in 300 characters or less.</strong></p>)}
                        </Col>

                    </Form.Group>
                </Row>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                    <Form.Text className='mb-3'>
                        <p className='h6'>** You will be contacted by our officials, regarding the mortgage documents for the loan.</p>
                    </Form.Text>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                    <Button type='submit' className='my-4 w-50' size='lg'>Apply</Button>
                    </Form>
                    </Card.Body>
                </Card>

                </Col>
            </Row>

            </Container>
        </>
    )
}

export default Homeloan;