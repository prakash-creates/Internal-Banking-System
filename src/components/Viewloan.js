import Footer from "./Footer";
import {Button, Form, Table} from 'react-bootstrap'
import { useState } from "react";

function Viewloan()
{

    const [editable, setEditable] = useState(true);

    const [show, setShow] = useState(true);

    const data = [{
        "loanType": "Education Loan",
        "loanAmount": 654321,
        "loanTenure": 8,
        "monthlyEmi": 1234
    },
    {
        "loanType": "Personal Loan",
        "loanAmount": 123456,
        "loanTenure": 12,
        "monthlyEmi": 4321
    }];

    function changeState() {
        setShow(!show);
        setEditable(!editable);
    }

    return(
        <>
        <div style={{"paddingBottom" : "1em", "backgroundColor" : "#909090"}}>
            <h2 style={{"paddingTop" : "0.5em", "paddingBottom" : "0.5em", "color" : "#fff", "fontWeight" : "700", "fontFamily" : "cursive"}}>My Loans</h2>
            <Form>
            <div className="table-responsive container" style={{"height" : "25em", "overflow" : "scroll", "border" : "1px solid #000", "padding" : "2px", "marginBottom" : "2em", "backgroundColor" : "#fafafa"}}>
                <Table striped bordered hover style={{"fontSize" : "1.5em", "padding" : "2em"}}>
                    <thead className="thead-dark" style={{"color" : "#fff", "backgroundColor" : "#212529", "borderColor" : "#32383e", "position" : "sticky", "top" : "0px"}}>
                        <tr>
                            <th>Loan Type</th>
                            <th>Loan Amount</th>
                            <th>Loan Tenure</th>
                            <th>Expected Monthly EMI</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{item.loanType}</td>
                            <td>₹ {item.loanAmount}</td>
                            <td>
                                <Form.Group controlId="tenure">
                                    <Form.Control type="number" placeholder={item.loanTenure} disabled={editable}/>
                                </Form.Group>
                            </td>
                            <td>₹ {item.monthlyEmi}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {show ? (
                <div className="mb-4">
                    <Button id="edit" variant="danger" onClick={changeState}><span style={{"fontSize" : "1.5em"}}>Edit Loan Tenure</span></Button>
                </div>
            ) : (
                <div className="mb-4">
                    <Button id="save" variant="danger" onClick={changeState}><span style={{"fontSize" : "1.5em"}}>Modify Loan Details</span></Button>
                </div>
            )}

            </Form>

        </div>
        <Footer/>
        </>
    )
}

export default Viewloan;