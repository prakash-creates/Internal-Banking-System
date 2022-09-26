import "./Homepage.css";
import { Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import Footer from "./Footer";

function Homepage()
{

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Home Loans
        </Tooltip>
    );
    const renderTooltipTwo = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Education Loans
        </Tooltip>
    );

    return(
        <>
            {/* First Section Start */}
            <div className="first-section">
                <div className="first-section-left">
                <Carousel variant="dark" interval={3000} fade>

                    <Carousel.Item>
                        <img className="d-block carouselimage" src="https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241__480.jpg" alt="First slide" />
                        <Carousel.Caption>
                            <p className="carouseltextdark">Get financial independence</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block carouselimage" src="https://img.freepik.com/premium-photo/loan-wood-block-arrange-business-man-model_42256-1733.jpg?w=2000" alt="Second slide" />
                        <Carousel.Caption>
                            <p className="carouseltext">Minimum loan interest rates</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip} >
                            <img className="d-block carouselimage" src="https://economictimes.indiatimes.com/thumb/msid-81186230,width-1200,height-900,resizemode-4,imgsize-577337/home-loan-istock.jpg?from=mdr" alt="Third slide" />
                        </OverlayTrigger>
                        <Carousel.Caption>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block carouselimage" src="https://www.axisbank.com/images/default-source/progress-with-us_new/ask-before-getting-personal-loan.jpg" alt="Fourth slide" />
                        <Carousel.Caption>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltipTwo} >
                            <img className="d-block carouselimage" src="https://images.news18.com/ibnlive/uploads/2021/08/education-loan-image-2-16292824313x2.jpg" alt="Fifth slide" />
                        </OverlayTrigger>
                        <Carousel.Caption>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block carouselimage" src="https://www.medicaltourismco.com/wp-content/uploads/2019/04/Loan-Guidelines.jpg" alt="Last slide" />
                        <Carousel.Caption>
                            <p className="carouseltextdark">Easy Loan Approval</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    </Carousel>
                </div>
                <div className="first-section-right">
                    <h1 className="name-head">Internal Banking Systems &#40; IBS &#41;</h1>
                    <p className="subtext">Your true banking solutions.</p>
                    <p className="name-subhead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    
                </div>
            </div>
            {/* First Section End */}

            {/*Second section start*/}
            <div className="second-section">

                <div className="propaganda propaganda-left">
                    <img src="https://cdnblog.etmoney.com/wp-content/uploads/2019/04/Finding-right-fund.jpg" alt="some-image" className="propaganda-image"/>
                    <div className="propaganda-head">
                        <span className="propaganda-text">Hassle-free monetary solutions</span>
                    </div>
                </div>

                <div className="propaganda propaganda-right">
                    <img src="https://cdn.pixabay.com/photo/2018/04/25/08/40/hands-3348987_960_720.jpg" alt="some-image" className="propaganda-image"/>
                    <div className="propaganda-head">
                        <span className="propaganda-text">Reliable and trustworthy</span>
                    </div>
                </div>

                <div className="propaganda propaganda-left">
                    <img src="https://img.freepik.com/free-photo/businesspeople-meeting-plan-analysis-graph-company-finance-strat_74952-1347.jpg?size=626&ext=jpg&ga=GA1.2.241413268.1656494704" alt="some-image" className="propaganda-image"/>
                    <div className="propaganda-head">
                        <span className="propaganda-text">Your banker and advisor</span>
                    </div>
                </div>

                <div className="propaganda propaganda-right">
                    <img src="https://st2.depositphotos.com/1010613/7543/i/600/depositphotos_75435267-stock-photo-person-hand-giving-money.jpg" alt="some-image" className="propaganda-image"/>
                    <div className="propaganda-head">
                        <span className="propaganda-text">Credit is what we do</span>
                    </div>
                </div>
                
            </div>
            {/* Second Section end */}
            
            <Footer/>
        </>
    )
}

export default Homepage;