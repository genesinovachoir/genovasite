import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { subscribeUser } from '../lib/subscriberService';
import './Podcast.css';

const Podcast = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    const [isError, setIsError] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setIsError(true);
            setTimeout(() => setIsError(false), 2000);
            return;
        }

        if (email.trim()) {
            setStatus('submitting');
            const result = await subscribeUser({
                email: email,
                source: 'podcast'
            });

            if (!result.success) {
                console.error('Podcast subscription failed:', result.error);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('success');
                setEmail('');
                // Reset after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            }
        }
    };

    // Platform icons
    const platforms = [
        {
            name: 'Spotify',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.66 1.44.54.3.72.96.42 1.5-.239.481-.84.66-1.44.36z" />
                </svg>
            )
        },
        {
            name: 'Apple Podcasts',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c4.988 0 9.054 4.066 9.054 9.054 0 1.912-.6 3.685-1.62 5.142a.713.713 0 01-.584.317.72.72 0 01-.72-.72c0-.18.066-.349.18-.482a7.62 7.62 0 001.308-4.257 7.629 7.629 0 00-7.618-7.618 7.629 7.629 0 00-7.618 7.618c0 1.572.485 3.03 1.308 4.257a.72.72 0 01-.36 1.082.714.714 0 01-.584-.317c-1.02-1.457-1.62-3.23-1.62-5.142 0-4.988 4.066-9.054 9.054-9.054zm0 3.035a6.02 6.02 0 016.018 6.019 6.02 6.02 0 01-2.466 4.86.72.72 0 01-1.022-.18.72.72 0 01.18-1.022 4.586 4.586 0 001.872-3.658 4.583 4.583 0 00-4.582-4.583 4.583 4.583 0 00-4.582 4.583c0 1.474.706 2.792 1.872 3.658a.72.72 0 01-.842 1.168 6.02 6.02 0 01-2.466-4.86 6.02 6.02 0 016.018-6.019zm0 3.035a2.984 2.984 0 012.983 2.984c0 .958-.458 1.815-1.167 2.358v5.326c0 1.002-.815 1.817-1.816 1.817s-1.816-.815-1.816-1.817V13.98a2.98 2.98 0 01-1.167-2.358 2.984 2.984 0 012.983-2.984z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        }
    ];

    return (
        <div className="podcast-page">
            <section className="podcast-hero">
                {/* Background - Animated for depth */}
                <motion.div
                    className="podcast-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="podcast-bg-gradient" />
                    <div className="podcast-bg-radial" />
                </motion.div>

                {/* Soundwave - Single SVG with gentle CSS animation */}
                <motion.div
                    className="podcast-soundwave"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                >
                    <img
                        src="/podcast/soundwave.svg"
                        alt=""
                        className="soundwave-img"
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>

                {/* Main Centered Content */}
                <motion.main
                    className="podcast-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Badge */}
                    <div className="podcast-badge">
                        <span className="badge-dot" />
                        <span className="badge-text">{t('podcast.badge')}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="podcast-headline">
                        <span className="headline-main">{t('podcast.headline.main')}</span>
                        <span className="headline-accent">{t('podcast.headline.accent')}</span>
                    </h1>

                    {/* Subtext */}
                    <p className="podcast-subtext">
                        {t('podcast.subtext.line1')}
                        <br />
                        {t('podcast.subtext.line2')}
                    </p>

                    {/* Hero Visuals - Mic & Headphones */}
                    <div className="podcast-hero-visuals">
                        <div className="hero-visual hero-headphones">
                            <img
                                src="/podcast/headphone.svg"
                                alt="Headphones"
                                loading="eager"
                            />
                        </div>
                        <div className="hero-visual hero-mic">
                            <img
                                src="/podcast/mic.svg"
                                alt="Microphone"
                                loading="eager"
                            />
                        </div>
                    </div>
                </motion.main>

                {/* Bottom-Left Corner: Platform Icons */}
                <motion.div
                    className="podcast-platforms podcast-platforms--corner"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="platforms-label">{t('podcast.platforms_label')}</p>
                    <div className="platforms-icons">
                        {platforms.map((platform) => (
                            <div
                                key={platform.name}
                                className="platform-icon"
                                title={platform.name}
                            >
                                {platform.icon}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom-Right Corner: Email CTA */}
                <motion.div
                    className="podcast-cta podcast-cta--corner"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="cta-container-wrapper">
                        {status === 'success' ? (
                            <motion.div
                                className="cta-success-message"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div className="success-icon-circle">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M20 6L9 17L4 12" />
                                    </svg>
                                </div>
                                <span className="success-text">{t('podcast.cta.success')}</span>
                            </motion.div>
                        ) : (
                            <form className="cta-form" onSubmit={handleSubmit}>
                                <div className={`cta-input-wrapper ${isError ? 'error' : ''}`}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t('podcast.cta.placeholder')}
                                        className="cta-input"
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                    <button
                                        type="submit"
                                        className="cta-button"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? (
                                            <span className="cta-loader"></span>
                                        ) : (
                                            <>
                                                <span>{t('podcast.cta.button')}</span>
                                                <svg className="cta-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    <p className="cta-helper">{t('podcast.cta.helper')}</p>
                </motion.div>
            </section>
        </div>
    );
};

export default Podcast;
