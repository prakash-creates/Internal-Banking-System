import React, { Fragment } from "react";
import "./About.css";
import Footer from "./Footer";
const About = () => {
  return (
    <>
      <Fragment>
        <section className="about">
          <div className="row">
            <div className="column">
              <img
                src="https://www.forbes.com/advisor/wp-content/uploads/2021/02/960x0-32-900x510.jpg"
                alt="image"
              />
            </div>

            <div className="column">
              <div className="about-info">
                <div className="main-title">
                  <h2>About Us</h2>
                </div>

                <h3>Internal Banking Systems &#40; IBS &#41;</h3>
                <p>
                  IBS was formed in the year <i>wxyz</i>. This banking
                  application is for internal employees of the organisation only
                  and not for the general customers . We provide loan facilities
                  at lower interest rate than other banking institutions.
                </p>
                <br />

                <div className="contact-info">
                  <div className="info-row">
                    <div className="col">
                      <p>
                        Email addresses: <span>abc123@dummymail.com</span>
                        <br />
                        <span>xyz456@dummymail.com</span>
                        <br />
                        <span>mnop789@dummymail.com</span>
                      </p>
                    </div>

                    <div className="col">
                      <p>
                        Contact number: <br />
                        <span>Phone number (1) - 9876543210</span>
                        <br />
                        <span>Phone number (2) - 99887766</span>
                        <br />
                        <span>FAX number - 123456789</span>
                        <br />
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <p>
                      Address: <br />
                      <span>
                        Floor 5, Building No. - 4a,
                        <br />
                        ABC Complex, XYZ Road,
                        <br />
                        Greater Noida, Uttar Pradesh
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default About;