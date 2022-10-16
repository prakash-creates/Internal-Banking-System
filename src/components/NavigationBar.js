import './NavigationBar.css'
import { useState } from 'react';
import {Navbar, Container, Nav, Modal, Button} from 'react-bootstrap';
import {FaRupeeSign} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import Emicalculator from './Emicalculator';

function NavigationBar()
{
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Navbar bg="light" expand="sm" className='navbar-light'>
                <Container>
                    <Navbar.Brand href="/"><h1><span><FaRupeeSign/></span> IBS</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className='nav-link'><h5>Home</h5></Link>
                            <Link to="/login" className='nav-link'><h5>Login</h5></Link>
                            <Link to="/applyloan" className='nav-link'><h5>Apply Loan</h5></Link>
                            <Link onClick={handleShow} className='nav-link'><h5>EMI Calculator</h5></Link>
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
        </>
    )
}

export default NavigationBar;