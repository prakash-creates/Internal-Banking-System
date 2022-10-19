import './Aboutus.css'
import Footer from './Footer';

function Aboutus()
{
    return(
        <>
        <div className='aboutus-container'>
            <h3 className='aboutus-top'>About Us</h3>
            <div class="container first-section-aboutus">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="box">
                            <div class="row">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="box" style={{"backgroundColor" : "#fff", "padding" : "1em", "borderRadius" : "20%"}}>
                                        <h1 className="name-head">Internal Banking Systems &#40; IBS &#41;</h1>
                                        <p className="subtext">Your true banking solutions.</p>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-8">
                                    <div class="box">
                                        <p style={{"fontSize" : "1.5em"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container second-section-aboutus">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="box">
                            <p className='detail-head'>Address</p>
                            <p className='detail-body'><span>Floor 5, Building No. - 4a,<br/>ABC Complex, XYZ Road,<br/>Greater Noida, Uttar Pradesh</span></p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="box">
                            <p className='detail-head'>Contact number</p>
                            <p className='detail-body'><span>Phone number (1) - 9876543210</span><br/><span>Phone number (2) - 99887766</span><br/><span>FAX number - 123456789</span><br/></p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="box">
                            <p className='detail-head'>Email addresses</p>
                            <p className='detail-body'>
                                <span>abc123@dummymail.com</span><br/><span>xyz456@dummymail.com</span><br/><span>mnop789@dummymail.com</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            </div>

            {/* Footer Section */}
            <Footer/>
        </>
    )
}

export default Aboutus;