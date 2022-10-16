import './Aboutus.css'
import Footer from './Footer';

function Aboutus()
{
    return(
        <>
            <h3>About Us</h3>
            <div class="container first-section-aboutus">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="box">
                            <div class="row">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="box">
                                        <p>
                                            <img src='https://bl-i.thgim.com/public/companies/rf59pa/article37247765.ece/alternates/FREE_1200/fund' alt='image of some sort' style={{"width" : "100%"}}/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-8">
                                    <div class="box">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container second-section-aboutus">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="box">
                            <p>Address Part</p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div class="box">
                            <p>Contact number, FAX number, etc</p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-3">
                        <div class="box">
                            <p>Email addresses</p>
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