import {Container, Row, Col, Card, Form, Button, FloatingLabel} from 'react-bootstrap'

function Educationloan()
{

    return(
        <>
        <Container fluid>

        <Row className='d-flex justify-content-center align-items-center'>
        <Col lg='9' className='my-5'>

            <h1 className="text-dark mb-4">Apply for Education loan</h1>

            <Card style={{"border" : "1px solid #000", "backgroundColor" : "#F2F3F4", "boxShadow" : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset"}}>
            <Card.Body className='px-4'>

            <Form>

                <Row className='align-items-center'>
                    <Form.Group className="mb-3 pt-3" controlId="formBasicTenure">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-1" controlId="formTenure" label="Type of Loan">
                                <Form.Select type="number" placeholder="Enter Tenure" defaultValue={"Home loan"} disabled>
                                    <option defaultChecked>Education Loan</option>
                                    <option>Personal Loan</option>
                                    <option>Home Loan</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>

                    </Form.Group>
                </Row>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicAmount">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formAmount" label="Enter Amount">
                                <Form.Control type="number" placeholder="Enter username"/>
                            </FloatingLabel>
                        </Col>

                    </Form.Group>
                </Row>

                <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicTenure">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formTenure" label="Tenure of loan (in years)">
                                <Form.Control type="number" placeholder="Enter Tenure"/>
                            </FloatingLabel>
                        </Col>

                    </Form.Group>
                </Row>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                    <Row className='align-items-center'>
                    <Form.Group className="mb-3 pt-3" controlId="formBasicCourse">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-1" controlId="formTenure" label="Academic course for which the loan is being Taken">
                                <Form.Select type="number" placeholder="Enter Course" defaultValue={"PG Course"}>
                                    <option value={"ug"}>UG Course</option>
                                    <option value={"pg"}>PG Course</option>
                                    <option value={"diploma"}>Diploma Course</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>

                    </Form.Group>
                </Row>

                    <hr className="mx-3" style={{"borderWidth" : "3px"}} />

                <Row className='align-items-center'>

                    <Form.Group as={Row} controlId="CourseValue" className="mb-3 mt-3" style={{"border" : "1px solid #999", "marginLeft" : "1px", "marginRight" : "1%", "borderRadius" : "5px", "padding" : "2% 0%"}}>
                        <Form.Label><h6>Course Duration</h6></Form.Label>
                        <Col xs="9">
                            <Form.Range defaultValue={2} min={2} max={6} controlId={"CourseValue"}/>
                        </Col>
                        <Col xs="3">
                            <Form.Control defaultValue={2} controlId={"CourseValue"}/>
                        </Col>
                        <Form.Text disabled>Course Duration can be 2 years to 6 years</Form.Text>
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

export default Educationloan;