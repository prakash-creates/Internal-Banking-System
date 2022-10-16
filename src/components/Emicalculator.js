import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import {useState} from 'react';
import './Emicalculator.css'

function Emicalculator()
{

    const [emiValue, setEmiValue ] = useState(0);
    const [ tenureValue, setTenureValue ] = useState(2);
    const [ rateValue, setRateValue ] = useState(11);
    const [ amountValue, setAmountValue ] = useState(100000);

    const onRateValueChange = (event) => {
        setRateValue(event.target.value);
    };

    const LoanEmi = () => {

        let rate = rateValue/1200; // Rate of interest applicable for monthly EMI is first converted to monthly EMI rate.

        return (amountValue * rate * ((1+rate) ** (12*tenureValue)) / (((1+rate) ** (12*tenureValue)) - 1) );

        /* 
        Formula used for calculating montly EMI is :

            P x R x (1+R)^N / [(1+R)^N-1]

            Where,

            P = Principal amount of the loan

            R = Rate of interest

            N = Number of monthly instalments.
        */

    }

    let onFormSubmit = (event) => {
        event.preventDefault();

        console.log(tenureValue);
        console.log(rateValue);
        console.log(amountValue);

        setEmiValue(LoanEmi);
        
    };

    return(
        <>
            <Form onSubmit={onFormSubmit}>
                <FloatingLabel controlId="floatingSelect" label="Loan Type" className="mb-3 mt-3">
                    <Form.Select aria-label="Default select example" onChange={onRateValueChange}>
                        <option value="11">Home Loan</option>
                        <option value="12" defaultChecked>Personal Loan</option>
                        <option value="9">Education Loan</option>
                    </Form.Select>
                </FloatingLabel>

                <hr className="mx-n3" style={{"borderWidth" : "3px"}} />

                <Form.Group as={Row} controlId="AmountValue" className="mb-3 mt-3" style={{"border" : "1px solid #999", "marginLeft" : "1px", "marginRight" : "1%", "borderRadius" : "5px", "padding" : "2% 0%"}}>
                    <Form.Label><h6>Loan Amount</h6></Form.Label>
                    <Col xs="9">
                        <Form.Range value={amountValue} onChange={e => setAmountValue(e.target.value)} tooltip="on" min={100000} max={10000000} defaultValue={100000} step={100}/>
                    </Col>
                    <Col xs="3">
                        <Form.Control value={amountValue} defaultValue={100000}/>
                    </Col>
                    <Form.Text disabled>The range for loan amount is ₹ 1,00,000 to ₹1,00,00,000</Form.Text>
                </Form.Group>

                <hr className="mx-n3" style={{"borderWidth" : "3px", "marginTop" : "10px"}} />

                <Form.Group as={Row} controlId="formTenure" className="mb-3 mt-3" style={{"border" : "1px solid #999", "marginLeft" : "1px", "marginRight" : "1%", "borderRadius" : "5px", "padding" : "2% 0%"}}>
                    <Form.Label><h6>Loan Tenure (In years)</h6></Form.Label>
                    <Col xs="9">
                        <Form.Range value={tenureValue} onChange={e => setTenureValue(e.target.value)} tooltip="on" min={2} max={50} defaultValue={5}/>
                    </Col>
                    <Col xs="3">
                        <Form.Control value={tenureValue} defaultValue={5}/>
                    </Col>
                    <Form.Text disabled>You can avail any loan for time period of 2 years to 50 years</Form.Text>
                </Form.Group>

                <hr className="mx-n3" style={{"borderWidth" : "3px", "marginTop" : "10px"}} />

                <p className="text-center mt-3 emitext">The expected monthly EMI : <strong>₹ {Math.round(emiValue)}</strong></p>

                <hr className="mx-n3" style={{"borderWidth" : "3px", "marginTop" : "10px"}} />

                <Button variant="success" type="submit" size="lg">Calculate EMI</Button>
            </Form>

        </>
    )
}

export default Emicalculator;