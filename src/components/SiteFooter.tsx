import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import '../styles/components/Footer.scss';

const SiteFooter: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__socials">
                <a href="mailto:abhikumarsingh912@gmail.com" aria-label="Email"><FaEnvelope /></a>
                <a href="https://github.com/abhiraj2512" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/abhinandan-kumar-307166224/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://x.com/Abhinan45860262" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            </div>
            <div className="footer__copy">
                <p>Built by Abhinandan</p>
            </div>
        </footer>
    );
};

export default SiteFooter;
