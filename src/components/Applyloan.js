import Footer from "./Footer";
import {Tabs, Tab} from 'react-bootstrap'
import './Applyloan.css';
import Homeloan from "./Homeloan";
import Personalloan from "./Personalloan";
import Educationloan from "./Educationloan";

function Applyloan()
{
    return(
        <>
        <div className="outer-main-part">
            <div className="applyloan">
                <Tabs defaultActiveKey="homeloan" id="loans" className="mb-3" fill>
                    <Tab eventKey="homeloan" title="Home Loan">
                        <Homeloan/>
                    </Tab>
                    <Tab eventKey="personalloan" title="Personal Loan">
                        <Personalloan/>
                    </Tab>
                    <Tab eventKey="educationloan" title="Education Loan">
                        <Educationloan/>
                    </Tab>
                </Tabs>
            </div>
        </div>
        
        <Footer/>
        </>
    )
}

export default Applyloan;