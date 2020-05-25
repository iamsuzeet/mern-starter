import React from 'react';
import logo from '../img/logo-green.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="Natours logo" />
      </div>
      <ul className="footer__nav">
        <li>
          <a href={'/'}>About us</a>
        </li>
        <li>
          <a href={'/'}>Download apps</a>
        </li>
        <li>
          <a href={'/'}>Become a guide</a>
        </li>
        <li>
          <a href={'/'}>Careers</a>
        </li>
        <li>
          <a href={'/'}>Contact</a>
        </li>
      </ul>
      <p className="footer__copyright">
        &copy; by Sujit Dhaugoda. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
