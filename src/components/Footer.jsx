import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import OptimizedImage from './OptimizedImage';
import { subscribeUser } from '../lib/subscriberService';
import './Footer.css';

// Import Social Icons
import instaIcon from '../assets/icons/instagram.svg';
import spotifyIcon from '../assets/icons/spotify.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';

const SocialIcon = ({ name, href, src }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label={name}
        onClick={(e) => !href || href === '#' ? e.preventDefault() : null}
        style={{ cursor: !href || href === '#' ? 'default' : 'pointer' }}
    >
        <OptimizedImage
            src={src}
            alt={name}
            className="social-icon-img"
        />
    </a>
);

const Footer = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');

        const result = await subscribeUser({
            email: email,
            name: name || null,
            source: 'footer'
        });

        if (!result.success) {
            console.error('Subscription failed:', result.error);
            alert('Subscription failed. Please try again.');
            setStatus('idle');
            return;
        }

        setStatus('success');
        setName('');
        setEmail('');

        // Revert to idle after 5 seconds to allow another subscription if needed
        setTimeout(() => setStatus('idle'), 5000);
    };

    React.useEffect(() => {
        const handleSync = (e) => {
            const { email: syncedEmail } = e.detail;
            if (syncedEmail) {
                setEmail(syncedEmail);
                setName(''); // Ensure name is empty
                setStatus('idle'); // Reset status if it was success

                const newsletterSection = document.getElementById('newsletter-section');
                const emailInput = document.getElementById('footer-email-input');

                if (newsletterSection) {
                    newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    newsletterSection.classList.remove('highlight-subtly');
                    void newsletterSection.offsetWidth;
                    newsletterSection.classList.add('highlight-subtly');

                    setTimeout(() => {
                        newsletterSection.classList.remove('highlight-subtly');
                    }, 2000);
                }

                if (emailInput) {
                    setTimeout(() => {
                        emailInput.focus({ preventScroll: true });
                    }, 600);
                }
            }
        };

        window.addEventListener('footer-subscribe-sync', handleSync);
        return () => window.removeEventListener('footer-subscribe-sync', handleSync);
    }, []);

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <ScrollReveal>
                    <div className="footer-content">
                        {/* Column 1: Brand, Newsletter, & Socials */}
                        <div className="brand-column">
                            <div className="brand-info">
                                <h2>Genesi Nova</h2>
                            </div>

                            {/* Compact Newsletter */}
                            <div id="newsletter-section" className="compact-newsletter">
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            className="newsletter-success-state"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="success-check-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M20 6L9 17L4 12" />
                                                </svg>
                                            </div>
                                            <div className="success-text-group">
                                                <h4 className="success-headline">{t('footer.success.title')}</h4>
                                                <p className="success-desc">{t('footer.success.message')}</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <h4 className="compact-title">{t('footer.stay_close')}</h4>
                                            <p className="newsletter-subtext">{t('footer.no_nuisance')}</p>
                                            <form className="newsletter-form-compact" onSubmit={handleSubscribe}>
                                                <div className="input-row">
                                                    <input
                                                        type="text"
                                                        placeholder={t('footer.full_name')}
                                                        className="compact-input"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                        disabled={status === 'submitting'}
                                                    />
                                                    <input
                                                        id="footer-email-input"
                                                        type="email"
                                                        placeholder={t('footer.email')}
                                                        className="compact-input"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        disabled={status === 'submitting'}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className={`compact-submit-btn ${status === 'submitting' ? 'submitting' : ''}`}
                                                    disabled={status === 'submitting'}
                                                >
                                                    {status === 'submitting' ? (
                                                        <span className="btn-loader"></span>
                                                    ) : t('footer.subscribe')}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="social-links">
                                <SocialIcon name="Instagram" href="https://www.instagram.com/genesi_nova/" src={instaIcon} />
                                <SocialIcon name="YouTube" href="http://youtube.com/@GenesiNovaChoir" src={youtubeIcon} />
                                <SocialIcon name="Spotify" href="#" src={spotifyIcon} />
                                <SocialIcon name="LinkedIn" href="https://www.linkedin.com/company/genesi-nova-choir/" src={linkedinIcon} />
                                <SocialIcon name="TikTok" href="#" src={tiktokIcon} />
                            </div>
                        </div>

                        {/* Column 2: More About Us */}
                        <div>
                            <span className="footer-col-title">{t('footer.more_about')}</span>
                            <div className="footer-links">
                                <Link to="/about" className="footer-link">{t('footer.about_us')}</Link>
                                <Link to="/contact" className="footer-link">{t('footer.contact')}</Link>
                                <Link to="/store" className="footer-link">{t('header.store')}</Link>
                                <Link to="/collab" className="footer-link">{t('footer.collab')}</Link>
                            </div>
                        </div>

                        {/* Column 3: Creative Works */}
                        <div>
                            <span className="footer-col-title">{t('footer.creative_works')}</span>
                            <div className="footer-links">
                                <Link to="/choir" className="footer-link">{t('footer.choir')}</Link>
                                <Link to="/podcast" className="footer-link">{t('header.podcast')}</Link>
                                <Link to="/media" className="footer-link">{t('header.media')}</Link>
                                <Link to="/blog" className="footer-link">{t('header.blog')}</Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <p>
                            Bu site Ali Diyar Duran tarafından geliştirilmiş olup Genesi Nova Korosu'na armağan edilmiştir | &copy; {new Date().getFullYear()} Genesi Nova Korosu. Tüm hakları saklıdır.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </footer>
    );
};

export default Footer;
