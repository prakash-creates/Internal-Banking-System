import Footer from "./Footer";
import {Button, Form, Table, Card, FloatingLabel, Row, Col} from 'react-bootstrap'
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";

function Viewloan()
{

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

    }

    const [editable, setEditable] = useState(true);

    const [show, setShow] = useState(true);

    const [data, setLoanData] = useState([]);

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
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = (userObj) => 
    {
        console.log(localStorage.demo);

        //Parsing the data to integer.

        userObj.duration = parseInt(userObj.duration);

        console.log(userObj["duration"]);
        const ind = userObj.loanid;
        data[ind].duration = userObj.duration;

        console.log(userObj);
        console.log("The json object to be passed to backend is ", data[userObj.loanid])
        console.log(localStorage.token);

        //Calculating Monthly EMI : 
        //console.log("Monthly EMI : " + LoanEmi(rateOfInterest, userObj.amount, userObj.duration));

            
        //To submit the loan applied by the user 
        axios
            .put("http://localhost:8083/updateLoan/"+localStorage.username, data[userObj.loanid],
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
        setShow(!show);
        setEditable(!editable);
    }


    useEffect(() => {
        axios
        .get("http://localhost:8083/userLoan/"+localStorage.username,
        {
            headers: 
            {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.demo}`
            }
        },)
        .then((res) => {
            console.log(res.data);
            console.log(res);
            setLoanData(res.data);
        })
        .catch((e) => {
            console.log(e);
            alert("Could not fetch the loan details");
        });
        console.log(localStorage.token);
        console.log(localStorage.demo);

} 
    , []);

    return(
        <>
        <div style={{"paddingBottom" : "1em", "backgroundColor" : "#909090"}}>
            <h2 style={{"paddingTop" : "0.5em", "paddingBottom" : "0.5em", "color" : "#fff", "fontWeight" : "700", "fontFamily" : "cursive"}}>My Loans</h2>
            
            <div className="table-responsive container" style={{"height" : "35em", "overflow" : "scroll", "border" : "1px solid #000", "padding" : "2px", "marginBottom" : "2em", "backgroundColor" : "#fafafa"}}>
                <Table striped bordered hover style={{"fontSize" : "1.5em", "padding" : "2em", "width" : "150%"}}>
                    <thead className="thead-dark" style={{"color" : "#fff", "backgroundColor" : "#212529", "borderColor" : "#32383e", "position" : "sticky", "top" : "0px"}}>
                        <tr style={{border : "1px solid #fff", "borderBottomWidth" : "2px"}}>
                            <th colSpan={6}>Generic Loan Details</th>
                            <th colSpan={2}>Education Loan</th>
                            <th>Home Loan</th>
                            <th colSpan={2}>Personal Loan</th>
                        </tr>
                        <tr>
                            <th>Serial no</th>
                            <th style={{"width" : "20em"}}>Loan Id</th>
                            <th style={{"width" : "20em"}}>Loan Type</th>
                            <th style={{"width" : "20em"}}>Loan Amount</th>
                            <th style={{"width" : "20em"}}>Loan Tenure</th>
                            <th style={{"width" : "20em"}}>Expected Monthly EMI</th>
                            <th style={{"width" : "20em"}}>Apply Date</th>
                            <th style={{"width" : "20em"}}>Course Name</th>
                            <th style={{"width" : "20em"}}>Course Fee</th>
                            <th style={{"width" : "20em"}}>Property Address</th>
                            <th style={{"width" : "20em"}}>Designation</th>
                            <th style={{"width" : "20em"}}>Total Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, i) => (
                        
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.id}</td>
                            <td>{item.loan_id.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.duration}</td>
                            <td>{LoanEmi(item.loan_id.interest, item.amount, item.duration)}</td>
                            <td>{item.applyDate}</td>
                            <td>{item.courseName}</td>
                            <td>{item.courseFee}</td>
                            <td>{item.permanentAddress}</td>
                            <td>{item.designation}</td>
                            <td>{item.totalExperience}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {
                show ? (
                    <div className="mb-4">
                        <Button id="edit" variant="danger" onClick={changeState}><span style={{"fontSize" : "1.5em"}}>Edit Loan Tenure</span></Button>
                    </div>
                ) : (
                    <div className="mb-4">
                        <Card style={{"border" : "1px solid #000", "marginLeft" : "10%", "marginRight" : "10%", "marginBottom" : "5%", "marginTop" : "5%", "backgroundColor" : "#CFD0D1", "boxShadow" : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset"}}>
                            <Card.Body className='px-4'>
                                <Form autoComplete='off' onSubmit={handleSubmit(onFormSubmit)}>

                                <Row className='align-items-center'>
                                    <Form.Group className="mb-3 pt-3" controlId="formBasicId">

                                        <Col md='10' className='mx-auto mt-3'>
                                            <FloatingLabel className="mb-1" controlId="formTenure" label="Select the serial no of the loan to be modified">
                                                <Form.Select type="number" placeholder="Enter Id" {...register("loanid", {required: true})}>
                                                    {/* <option>---Select a loan Id---</option> */}
                                                    {data.map((item, i) => <option value={i}>{i+1}</option>)}
                                                </Form.Select>
                                            </FloatingLabel>
                                            {errors.courseName?.type === "required" && (<p className="text-danger"><strong>Please select a loan id for modifications</strong></p>)}
                                        </Col>

                                    </Form.Group>
                                </Row>

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

                                    <Button id="save" variant="danger" type="submit"><span style={{"fontSize" : "1.5em"}}>Save Modifications</span></Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }

        </div>
        <Footer/>
        </>
    )
}

export default Viewloan;