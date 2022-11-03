import {FaFacebook, FaTwitter, FaYoutube} from 'react-icons/fa';
import './Footer.css';

function Footer()
{
    return(
        <footer>
            <div className="footer-content">
                <h3>Internal Banking Systems</h3>
                <p>Your true banking solutions</p>
                <ul class="socials">
                    <li><a href="#"><FaFacebook/></a></li>
                    <li><a href="#"><FaTwitter/></a></li>
                    <li><a href="#"><FaYoutube/></a></li>
                </ul>
            </div>

            <div className="footer-bottom">
                <p>copyright &copy;2022 <a href="#"> &nbsp;&nbsp;IBS</a></p>
            </div>
        </footer>
    )
}

export default Footer;