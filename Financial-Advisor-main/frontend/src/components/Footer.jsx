import {React} from 'react';
import {Link} from "react-router-dom"
import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaMedium, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-icons">
          <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></Link>
          <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
          <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></Link>
          <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></Link>
          <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></Link>
          <Link to="https://medium.com" target="_blank" rel="noopener noreferrer"><FaMedium /></Link>
          <Link to="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></Link>
        </div>
        <div className="footer-text">
          <p>&copy; 2024 Byte Hogs, Inc.</p>
          <div className="footer-links">
            <Link to="/home">Home</Link>
            <Link to="/Tracker">Expense Tracker</Link>
            <Link to="/income-management">Income Management</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/budgeting">Budgeting</Link>
            <Link to="/reports">Reports</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
