import {Container, Row, Col, Card, Form, Button, FloatingLabel} from 'react-bootstrap'

function Homeloan()
{
    return(
        <>
        <Container fluid>

        <Row className='d-flex justify-content-center align-items-center'>
        <Col lg='9' className='my-5'>

            <h1 className="text-dark mb-4">Apply for home loan</h1>

            <Card style={{"border" : "1px solid #000", "backgroundColor" : "#F2F3F4", "boxShadow" : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset"}}>
            <Card.Body className='px-4'>

            <Form>

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

                <Row className='align-items-center pt-4'>
                    <Form.Group className="mb-3" controlId="formBasicAddress">

                        <Col md='10' className='mx-auto mt-3'>
                            <FloatingLabel className="mb-3" controlId="formAddress" label="Enter the address of the property">
                                <Form.Control as="textarea" placeholder="Enter address" style={{ height: '100px' }}/>
                            </FloatingLabel>
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