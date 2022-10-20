import './NavigationBar.css'
import { Fragment, useState } from 'react';
import {Navbar, Container, Nav, Modal, Button} from 'react-bootstrap';
import {FaRupeeSign} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import Emicalculator from './Emicalculator';

export default function NavigationBar()
{
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                    <Link to="/applyloan" className='nav-link'><h5>Apply Loan</h5></Link>
                                    <Link to="/viewloan" className='nav-link'><h5>View Loan Details</h5></Link>
                                    <Link onClick={handleLogout} className='nav-link'><h5>Logout</h5></Link>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link to="/login" className='nav-link'><h5>Login</h5></Link>
                                    <Link onClick={handleShow} className='nav-link'><h5>EMI Calculator</h5></Link>
                                    <Link to="/aboutus" className='nav-link'><h5>About Us</h5></Link>
                                </Fragment>
                            )}
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
        </>
    )
}

