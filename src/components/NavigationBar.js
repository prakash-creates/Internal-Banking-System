import './NavigationBar.css'
import { Fragment, useState } from 'react';
import {Navbar, Container, Nav, Modal, Button, Table} from 'react-bootstrap';
import {FaRupeeSign, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import Emicalculator from './Emicalculator';
import axios from 'axios';

export default function NavigationBar()
{
    //Below 3 lines handle modal window for the EMI Calculator
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Below 3 lines handle modal window for the User Details
    const [showDetails, setShowDetails] = useState(false);
    const handleDetailClose = () => setShowDetails(false);
    const handleDetailShow = () => setShowDetails(true);

    const [userDetails, setUserDetails] = useState([]); //This will store the user details.

    const handleClick = () => {
        axios
        .get("http://localhost:8080/api/auth/getuserdetails")
        .then((res) => {
            setUserDetails(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleEvent = () => {
        handleClick();
        handleDetailShow();
    }

    const handleLogout = () => {
        localStorage.isLoggedIn = false;
        window.location = "/";
    }

    return(
        <>
            <Navbar bg="light" expand="sm" className='navbar-light'>
                <Container>
                    <Navbar.Brand href="/"><h1><span><FaRupeeSign/></span> IBS</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className='nav-link'><h5>Home</h5></Link>
                            {localStorage.isLoggedIn && localStorage.isLoggedIn === 'true' ? (
                                <Fragment>
                                    <Link onClick={handleEvent} className='nav-link'><h5><FaUser/>{localStorage.username}</h5></Link>
                                    <Link to="/applyloan" className='nav-link'><h5>Apply Loan</h5></Link>
                                    <Link to="/viewloan" className='nav-link'><h5>View Loan Details</h5></Link>
                                    <Link onClick={handleLogout} className='nav-link'><h5>Logout</h5></Link>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link to="/login" className='nav-link'><h5><FaUser/>Login</h5></Link>
                                </Fragment>
                            )}
                            <Link onClick={handleShow} className='nav-link'><h5>EMI Calculator</h5></Link>
                            <Link to="/aboutus" className='nav-link'><h5>About Us</h5></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* EMI Calculator */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>EMI Calculator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-center text-secondary h6'>Note : This calulator is for Informative Purposes only.</p>
                    <Emicalculator/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}> <b>Close</b> </Button>
                </Modal.Footer>
            </Modal>

            {/* User Details */}

            <Modal show={showDetails} onHide={handleDetailClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-center text-secondary h6'>Note : This calulator is for Informative Purposes only.</p>
                    <Table striped bordered hover style={{"fontSize" : "1.5em", "padding" : "2em"}}>
                    <tbody>
                    {userDetails.map((item) => (
                        <>
                        <tr>
                            <td><strong>Id : </strong></td>
                            <td>₹ {item.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Username : </strong></td>
                            <td>₹ {item.username}</td>
                        </tr>
                        <tr>
                            <td><strong>Full Name : </strong></td>
                            <td>₹ {item.name}</td>
                        </tr>
                        <tr>
                            <td><strong>User Type : </strong></td>
                            <td>₹ {item.user_type}</td>
                        </tr>
                        <tr>
                            <td><strong>Gender : </strong></td>
                            <td>₹ {item.gender}</td>
                        </tr>
                        <tr>
                            <td><strong>Designation : </strong></td>
                            <td>₹ {item.designation}</td>
                        </tr>
                        <tr>
                            <td><strong>Address : </strong></td>
                            <td>₹ {item.address}</td>
                        </tr>
                        <tr>
                            <td><strong>Email Id : </strong></td>
                            <td>₹ {item.email_id}</td>
                        </tr>
                        <tr>
                            <td><strong>Contact Number : </strong></td>
                            <td>₹ {item.contact_no}</td>
                        </tr>
                        </>
                        ))}
                    </tbody>
                </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleDetailClose}> <b>Close</b> </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

