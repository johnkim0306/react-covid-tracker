import React from 'react'
import './footer.scss'
import {FaFacebookF, FaGithub} from 'react-icons/fa';
import {BsLinkedin} from 'react-icons/bs'

const Footer = () => {
    return (
            <div className="footer__container">
                <div className="footer__icons">
                    <div className="footer__icons--wrapper">
                        <div className="footer__icon">
                            <a href="https://www.facebook.com/profile.php?id=100000925471875"> <FaFacebookF /></a>
                        </div>
                        <div className="footer__icon">
                            <a href="https://www.linkedin.com/in/john-k-51a119129/" target="_blank"> <BsLinkedin /></a>
                        </div>
                        <div className="footer__icon">
                            <a href="https://github.com/johnkim0306" target="_blank"> <FaGithub /></a>
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    <p className="p-text">@2022 John Kim</p>
                    <p className="p-text">All rights reserved</p>
                </div>
            </div>
    )
}

export default Footer