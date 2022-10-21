import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux' 
import {useForm} from 'react-hook-form'
import { FcInfo } from "react-icons/fc";
import {Link, useNavigate} from 'react-router-dom'
import { userLogin } from "../slices/userSlice";
import './Login.css';
import {FloatingLabel, Form, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import Footer from './Footer';
import axios from "axios";

function Login()
{

    const popover = (
        <Popover id="username-popover">
        <Popover.Header as="h3">Username - Allowed patterns</Popover.Header>
        <Popover.Body>
            <ul>
                <li>Alphabets, numbers and underscore ( _ ) only.</li>
                <li>Should start with alphabet only.</li>
                <li>Cannot end with underscore ( _ ).</li>
                <li>Minimum length = 5 characters</li>
            </ul>
        </Popover.Body>
        </Popover>
    );

    const popoverPass = (
        <Popover id="password-popover">
        <Popover.Header as="h3">Password - Allowed patterns</Popover.Header>
        <Popover.Body>
            <ul>
                <li>Alphanumeric characters only.</li>
                <li>At least 1 uppercase letter.</li>
                <li>At least 1 lowercase letter.</li>
                <li>At least 1 number.</li>
                <li>Minimum length = 8 characters</li>
                <li>Maximum length = 16 characters</li>
            </ul>
        </Popover.Body>
        </Popover>
    );

    /*let { userObj, isSuccess, isError, errMsg } = useSelector(
        (state) => state.data
    );*/

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();

        const onFormSubmit = (userObj) => {
            console.log(userObj["username"]);
        

            axios
                .post("http://localhost:8080/api/auth/login", { // This needs to be rectified
                    username: userObj["username"],
                    password: userObj["password"]
                    
                })
                .then((res) => {
                    console.log(res);
                    localStorage.token = `Bearer ${res.data.jwttoken}`;
                    localStorage.isLoggedIn = true;
                    localStorage.username = userObj["username"];
                    window.location = "/";
                

                    alert("Login Successful");
                })
                .catch((e) => {
                    console.log(e);
                    alert("Login Failed");
                });
        };

        /*useEffect(() => {
            if (isSuccess) {
                navigate("/applyloan");
            }
        }, [isSuccess, userObj, navigate]);*/

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
                            <Form autoComplete='off' onSubmit={handleSubmit(onFormSubmit)}>

                            <div className="form-outline mb-4">
                                <FloatingLabel className="mb-3 row" controlId="formUsername" label="Enter Username">
                                    <Form.Control type="text" placeholder="Enter username" {...register("username", {required: true, minLength: 5, pattern: /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/})} />
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                        <Button variant="none" style={{"marginTop" : "0.5em"}}><FcInfo style={{"fontSize" : "1em"}}/>  <span className="text-muted" style={{"fontWeight" : "700", "fontSize" : "0.9em"}}>Username Pattern</span></Button>
                                    </OverlayTrigger>
                                    {errors.username?.type === "pattern" && (<p className="text-danger"><strong>Please use the valid format of username</strong></p>)}
                                    {errors.username?.type === "required" && (<p className="text-danger"><strong>Please enter your username</strong></p>)}
                                    {errors.username?.type === "minLength" && (<p className="text-danger"><strong>Username should be minimum 5 characters long</strong></p>)}
                                </FloatingLabel>
                            </div>

                            <div className="form-outline">
                                <FloatingLabel className="mb-3 row" controlId="formPassword" label="Enter Password">
                                    <Form.Control type="password" placeholder="Enter password" {...register("password", {required: true, minLength: 8, maxLength: 16, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})} />
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverPass}>
                                        <Button variant="none" style={{"marginTop" : "0.5em"}}><FcInfo style={{"fontSize" : "1em"}}/>  <span className="text-muted" style={{"fontWeight" : "700", "fontSize" : "0.9em"}}>Allowed Password Pattern</span></Button>
                                    </OverlayTrigger>
                                    {errors.userpassword?.type === "pattern" && (<p className="text-danger"><strong>Please follow the pattern for password</strong></p>)}
                                    {errors.userpassword?.type === "required" && (<p className="text-danger"><strong>Please enter your Password</strong></p>)}
                                    {errors.userpassword?.type === "minLength" && (<p className="text-danger"><strong>Password should be minimum 8 characters long</strong></p>)}
                                    {errors.userpassword?.type === "maxLength" && (<p className="text-danger"><strong>Password can be maximum 16 characters long</strong></p>)}
                                </FloatingLabel>
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <p className="text-secondary h6">Forgot Password ?</p>
                                <Button variant="primary" type="submit" style={{"width" : "30%"}}> <strong className="text-white">Log In</strong> </Button>
                            </div>
                    {/*
                            <div class="d-flex align-items-center justify-content-center pb-4">
                                <p class="mb-0 me-2">Don't have an account?</p>
                                <button type="button" class="btn btn-outline-danger"><strong>Create new</button>
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