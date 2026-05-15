import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <a href="#hero" className="nav-logo"><span>Gazi</span>Tahsin</a>
            <div className="nav-links">
                {/* <a href="#nature">Nature</a> */}
                <a href="#galaxy">Galaxy</a>
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
                <a href="#education">Education</a>
                <a href="#contact">Contact</a>
            </div>
            <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            {menuOpen && (
                <div className="mobile-menu">
                    {/* <a href="#nature" onClick={() => setMenuOpen(false)}>Nature</a> */}
                    <a href="#galaxy" onClick={() => setMenuOpen(false)}>Galaxy</a>
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
                    <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
                    <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                </div>
            )}
        </nav>
    );
}
