import './NavigationBar.css'
import {Navbar, Container, Nav} from 'react-bootstrap';
import {FaRupeeSign} from 'react-icons/fa'
import {Link} from 'react-router-dom';

function NavigationBar()
{
    return(
        <>
            <Navbar bg="light" expand="sm" className='navbar-light'>
                <Container>
                    <Navbar.Brand href="/"><h1><span><FaRupeeSign/></span> IBS</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className='nav-link'>Home</Link>
                            <Link to="/login" className='nav-link'>Login</Link>
                            <Link to="/aboutus" className='nav-link'>About Us</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar;