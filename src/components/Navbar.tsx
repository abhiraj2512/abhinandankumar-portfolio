import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import Button from './Button';
import { content } from '../data/content';
import '../styles/components/Navbar.scss';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
    theme: string;
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { hero } = content;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'open' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar__container">
                <a href="#" className="navbar__logo">A</a>

                <div className="navbar__actions">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="navbar__toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                <ul className={`navbar__links ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link, i) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <a href={link.href} onClick={() => setIsOpen(false)}>{link.name}</a>
                        </motion.li>
                    ))}
                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: navLinks.length * 0.1 }}
                    >
                        <Button
                            href={hero.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            Resume
                        </Button>
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
