import './NavigationBar.css'
import { Fragment, useEffect, useState, Dropdown } from 'react';
import {Navbar,NavDropdown, Container, Nav, Modal, Button, Table} from 'react-bootstrap';
import {FaRupeeSign, FaUserCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import Emicalculator from './Emicalculator';
import axios from 'axios';

export default function NavigationBar()
{


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userDetails, setUserDetails] = useState([]);

    const [showDetails, setShowDetails] = useState(false);
    const handleDetailClose = () => setShowDetails(false);
    const handleDetailShow = () => setShowDetails(true);

    useEffect ( () => {
        axios
        .get("http://localhost:8083/api/auth/get/"+localStorage.username,
        {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ${localStorage.demo}`            }           })
        .then((res) => {
            setUserDetails(res.data)
        })
    }, []
   // console.log(userDetails);
    )
//console.log(res);

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
                            {localStorage.isLoggedIn && localStorage.isLoggedIn === 'true' ? (
                                <Fragment>
                                    <Link to="/" className='nav-link'><h5>Home</h5></Link>

                                    <NavDropdown title = {<h5><FaUserCircle/>  {localStorage.username}</h5>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleDetailShow}><h5>View User Details</h5></NavDropdown.Item>
                                <NavDropdown.Item href="/applyloan">
                                    <h5>Apply Loan</h5>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/viewloan"><h5>View Loan Details</h5></NavDropdown.Item>
                    
                                </NavDropdown>


                                    
                                    <Link onClick={handleLogout} className='nav-link'><h5>Logout</h5></Link>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link to="/login" className='nav-link'><h5>Login</h5></Link>
                                    <Link onClick={handleShow} className='nav-link'><h5>EMI Calculator</h5></Link>
                                </Fragment>
                            )}
                            <Link to="/aboutus" className='nav-link'><h5>About Us</h5></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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
                        <Table striped bordered hover style={{"fontSize" : "1.5em", "padding" : "2em"}}>
                        <tbody>
                        
                        <>
                        <tr>
                            <td><strong>Id : </strong></td>
                            <td> {userDetails.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Username : </strong></td>
                            <td> {userDetails.userName}</td>
                        </tr>
                        
                        <tr>
                            <td><strong>User Type : </strong></td>
                            <td> {userDetails.usertype}</td>
                        </tr>
                        <tr>
                            <td><strong>Gender : </strong></td>
                            <td> {userDetails.gender}</td>
                        </tr>
                        <tr>
                            <td><strong>Designation : </strong></td>
                            <td> {userDetails.designation}</td>
                        </tr>
                        <tr>
                            <td><strong>Address : </strong></td>
                            <td> {userDetails.address}</td>
                        </tr>
                        <tr>
                            <td><strong>Email Id : </strong></td>
                            <td> {userDetails.emailid}</td>
                        </tr>
                        <tr>
                            <td><strong>Contact Number : </strong></td>
                            <td> {userDetails.contactno}</td>
                        </tr>
                        </>
                        
                        
                        
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