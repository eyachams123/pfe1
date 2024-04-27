import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <div className='Footer'>
        <div id="last_section" className="row">
            <div className="col-md-4 follow-us-section">
                <div className="text-center">
                    <p className="mb-3">Follow Us</p>
                    <div className="social-icons">
                        <a href="#" className="mr-3"><img src="images/fb.jpg" alt="Facebook" /></a>
                        <a href="#" className="mr-3"><img src="images/insta.jpg" alt="Instagram" /></a>
                        <a href="#"><img src="images/lin.jpg" alt="link" /></a>
                    </div>
                </div>
            </div>
            <div className="col-md-4 contact-section">
                <div className="text-center">
                    <p>Contact</p>
                    <p>Phone: +1 123 456 789</p>
                    <p>Email: info@example.com</p>
                </div>
            </div>
            <div className="col-md-4 privacy-section">
                <div className="text-center">
                    <p className="privacy-text">Privacy</p>
                </div>
            </div>
            <div id="copy" className="copyright-section text-center">
                <p>&copy; 2024. Tous droits réservés.</p>
            </div>
        </div>
        </div>
    );
}

export default Footer;
