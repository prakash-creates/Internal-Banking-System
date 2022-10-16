import './Login.css';
import {FloatingLabel, Form, Button} from 'react-bootstrap';
import Footer from './Footer';

function Login()
{
    return(
        <>
            <section class="h-100 gradient-form" style={{"background" : "rgb(112,218,125)"}}>
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black"  style={{"border" : "1px solid #000", "backgroundColor" : "#F2F3F4" ,"boxShadow" : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0) 0px 30px 60px -30px, rgba(10, 37, 64) 0px -2px 6px 0px inset"}}>
                    <div class="row g-0">
                    <div class="col-lg-6 d-flex align-items-center">
                        <div class="text-dark px-3 py-4 p-md-5 mx-md-4">
                            <div class="text-center">
                                <h1 className="name-head">Internal Banking<br/> Systems &#40; IBS &#41;</h1>
                                <p className="subtext">Your true banking solutions.</p>
                            </div>
                            <h4 class="mb-4">We are more than just a bank.</h4>
                            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        </div>
                        <div class="col-lg-6 right-part-section">
                        <div class="card-body p-md-5 mx-md-4">

                        <h3 style={{"marginBottom" : "1.3rem"}}>Sign In</h3>
                            <Form autoComplete='off'>
                            

                            <div class="form-outline mb-4">
                                <FloatingLabel className="mb-3" controlId="formUsername" label="Enter Username">
                                    <Form.Control type="text" placeholder="Enter username"/>
                                </FloatingLabel>
                            </div>

                            <div class="form-outline mb-4">
                                <FloatingLabel className="mb-3" controlId="formPassword" label="Enter Password">
                                    <Form.Control type="password" placeholder="Enter password"/>
                                </FloatingLabel>
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <p className="text-secondary h6">Forgot Password ?</p>
                                <Button variant="primary" type="submit" style={{"width" : "30%"}}> <strong className="text-white">Log In</strong> </Button>
                            </div>
                    {/*
                            <div class="d-flex align-items-center justify-content-center pb-4">
                                <p class="mb-0 me-2">Don't have an account?</p>
                                <button type="button" class="btn btn-outline-danger">Create new</button>
                            </div>
                    */}

                            </Form>

                        </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <Footer/>
        </>
    )
}

export default Login;