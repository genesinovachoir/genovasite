import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [activeSection, setActiveSection] = React.useState('home');
    const [isSticky, setIsSticky] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const headerRef = React.useRef(null);

    const location = useLocation();
    const navigate = useNavigate();
    const isStorePage = location.pathname === '/store';
    const isCollabPage = location.pathname === '/collab';
    const isBlogPage = location.pathname.startsWith('/blog');
    const isMediaPage = location.pathname === '/media';
    const isPodcastPage = location.pathname === '/podcast';
    const isContactPage = location.pathname === '/contact';
    const isAboutPage = location.pathname === '/about';

    React.useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);

            if (isStorePage) {
                setActiveSection('store');
                return;
            }
            if (isAboutPage) {
                setActiveSection('about');
                return;
            }
            if (isCollabPage) {
                setActiveSection('collab');
                return;
            }
            if (isBlogPage) {
                setActiveSection('blog');
                return;
            }
            if (isMediaPage) {
                setActiveSection('media');
                return;
            }
            if (isPodcastPage) {
                setActiveSection('podcast');
                return;
            }
            if (isContactPage) {
                setActiveSection('contact');
                return;
            }

            // Active section logic for Homepage
            const sections = ['home', 'about', 'media', 'podcast', 'contact'];
            let current = 'home';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger once

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isStorePage, isCollabPage, isBlogPage, isMediaPage, isPodcastPage, isContactPage, isAboutPage]);

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        const prevOverflow = document.body.style.overflow;

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isMenuOpen]);

    const handleNavClick = (e, item) => {
        e.preventDefault();
        const sectionId = item.toLowerCase();
        setIsMenuOpen(false); // Close menu on click

        if (sectionId === 'store') {
            navigate('/store');
            return;
        }

        if (sectionId === 'about') {
            navigate('/about');
            return;
        }

        if (sectionId === 'collab') {
            navigate('/collab');
            return;
        }

        if (sectionId === 'blog') {
            navigate('/blog');
            return;
        }

        if (sectionId === 'media') {
            navigate('/media');
            return;
        }

        if (sectionId === 'podcast') {
            navigate('/podcast');
            return;
        }

        if (sectionId === 'contact') {
            navigate('/contact');
            return;
        }

        if (sectionId === 'home') {
            if (isStorePage || isCollabPage || isBlogPage || isMediaPage || isContactPage || isPodcastPage || isAboutPage) {
                navigate('/');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        // For other sections (Contact, etc. that might still be anchors but not yet pages)
        if (isStorePage || isCollabPage || isBlogPage || isMediaPage || isPodcastPage || isContactPage || isAboutPage) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navItems = ['Home', 'About', 'Collab', 'Media', 'Podcast', 'Blog', 'Store', 'Contact'];

    return (
        <>
            <header ref={headerRef} className={`header-container ${isSticky ? 'sticky-header' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
                {/* Abstract Spiral-like SVG Background Element */}
                <div className="header-bg-decoration">
                    <svg width="100%" height="100%" viewBox="0 0 1440 300" preserveAspectRatio="none">
                        <path
                            d="M0,150 C300,100 600,200 900,150 C1200,100 1440,150 1440,150"
                            fill="none"
                            stroke="rgba(186, 180, 162, 0.1)"
                            strokeWidth="1"
                        />
                        <path
                            d="M0,180 C400,120 700,220 1000,160 C1300,100 1440,180 1440,180"
                            fill="none"
                            stroke="rgba(40, 46, 80, 0.2)"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                <div className="header-content">
                    <div className="logo-container">
                        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setIsMenuOpen(false); }}>
                            <OptimizedImage
                                src="/genesi_nova.svg"
                                alt="Genesi Nova Logo"
                                className="header-logo"
                            />
                        </a>
                    </div>

                    {/* Mobile Toggle & Language Switcher Layout Control */}
                    <div className="mobile-header-actions">
                        <div className="mobile-lang-wrapper">
                            <LanguageDropdown currentLang={i18n.language} onLangChange={(lang) => i18n.changeLanguage(lang)} />
                        </div>

                        <button
                            className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </div>

                    <nav className="desktop-nav">
                        <motion.ul
                            className="nav-menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <li className="desktop-nav-spacer" aria-hidden="true" key="spacer-left"></li>
                            {navItems.map((item, index) => {
                                const sectionId = item.toLowerCase();
                                const isActive = activeSection === sectionId;

                                let href = `/#${sectionId}`;
                                if (sectionId === 'store') href = '/store';
                                if (sectionId === 'about') href = '/about';
                                if (sectionId === 'collab') href = '/collab';
                                if (sectionId === 'blog') href = '/blog';
                                if (sectionId === 'media') href = '/media';
                                if (sectionId === 'podcast') href = '/podcast';
                                if (sectionId === 'contact') href = '/contact';

                                return (
                                    <React.Fragment key={item}>
                                        <li>
                                            <a
                                                href={href}
                                                className={`nav-link ${isActive ? 'active' : ''}`}
                                                onClick={(e) => handleNavClick(e, item)}
                                            >
                                                {t(`header.${sectionId}`)}
                                            </a>
                                        </li>
                                        {index < navItems.length - 1 && (
                                            <li className="nav-separator" aria-hidden="true">
                                                •
                                            </li>
                                        )}
                                    </React.Fragment>
                                );
                            })}

                            {/* Pinned Language Switcher with World Icon (Desktop) */}
                            <li key="lang-switcher" className="lang-switcher-item desktop-only">
                                <LanguageDropdown currentLang={i18n.language} onLangChange={(lang) => i18n.changeLanguage(lang)} />
                            </li>
                        </motion.ul>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay — rendered outside <header> to avoid backdrop-filter containing block bug */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        style={{ top: headerRef.current?.offsetHeight || 70 }}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="mobile-menu-content">
                            <ul className="mobile-nav-list">
                                {navItems.map((item, index) => {
                                    const sectionId = item.toLowerCase();
                                    const isActive = activeSection === sectionId;

                                    return (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 + 0.2 }}
                                        >
                                            <a
                                                href={`/#${sectionId}`}
                                                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                                                onClick={(e) => handleNavClick(e, item)}
                                            >
                                                <span className="mobile-nav-num">{String(index + 1).padStart(2, '0')}</span>
                                                {t(`header.${sectionId}`)}
                                            </a>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            <div className="mobile-menu-footer">
                                <p className="premium-label">GENESI NOVA</p>
                                <div className="mobile-social-placeholder">
                                    {/* Abstract decorative elements */}
                                    <div className="deco-line"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Sub-component for the premium language dropdown
const LanguageDropdown = ({ currentLang, onLangChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (lang) => {
        onLangChange(lang);
        setIsOpen(false);
    };

    return (
        <div className="lang-dropdown-container" ref={dropdownRef}>
            <button
                className={`lang-globe-btn ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}
                aria-label="Change Language"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lang-dropdown-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="lang-dropdown-header">Select Language</div>
                        <div className="lang-dropdown-options">
                            <button
                                className={`lang-dropdown-opt ${currentLang === 'tr' ? 'active' : ''}`}
                                onClick={() => handleSelect('tr')}
                            >
                                Türkçe (TR)
                            </button>
                            <button
                                className={`lang-dropdown-opt ${currentLang === 'en' ? 'active' : ''}`}
                                onClick={() => handleSelect('en')}
                            >
                                English (EN)
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
