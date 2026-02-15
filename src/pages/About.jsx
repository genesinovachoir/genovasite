import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import IntroOverlay from '../components/about/IntroOverlay';
import StarfieldBackground from '../components/about/StarfieldBackground';
import './About.css';

const ABOUT_SECTIONS = ['whoWeAre', 'philosophy', 'approach', 'collective'];

const About = () => {
    const { t } = useTranslation();
    const [phase, setPhase] = useState(() => {
        return sessionStorage.getItem('aboutIntroSeen') === '1' ? 'content' : 'hero';
    });

    // On mount: ensure we stay in sync if needed (though useState init handles it)

    const handlePlayClick = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setPhase('intro');
    };

    const handleIntroComplete = () => {
        setPhase('content');
    };

    const handleReplay = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        sessionStorage.removeItem('aboutIntroSeen');
        setPhase('intro');
    };

    return (
        <div className="about-page">
            {/* =================== HERO STAGE =================== */}
            <AnimatePresence>
                {phase === 'hero' && (
                    <motion.section
                        className="about-hero"
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.05,
                            y: -10,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Subtle background starfield */}
                        <div className="about-hero-stars">
                            <StarfieldBackground />
                        </div>

                        {/* Radial glow */}
                        <div className="about-hero-glow" />

                        <motion.h1
                            className="about-hero-title"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.2,
                            }}
                        >
                            {t('about.heroTitle')}
                        </motion.h1>

                        <motion.button
                            className="about-play-btn"
                            onClick={handlePlayClick}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.6,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <svg
                                className="play-icon"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <polygon points="6,3 20,12 6,21" />
                            </svg>
                            <span>{t('aboutIntro.play')}</span>
                        </motion.button>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* =================== INTRO OVERLAY =================== */}
            {phase === 'intro' && (
                <IntroOverlay onComplete={handleIntroComplete} />
            )}

            {/* =================== ABOUT CONTENT =================== */}
            <AnimatePresence>
                {phase === 'content' && (
                    <motion.div
                        className="about-content"
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {ABOUT_SECTIONS.map((sectionKey, index) => (
                            <motion.section
                                key={sectionKey}
                                className="about-section"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.15 * index + 0.3,
                                }}
                            >
                                <span className="about-section-label">
                                    {t(`about.${sectionKey}.label`)}
                                </span>
                                <h2 className="about-section-title">
                                    {t(`about.${sectionKey}.title`)}
                                </h2>
                                <p className="about-section-body">
                                    {t(`about.${sectionKey}.body`)}
                                </p>
                            </motion.section>
                        ))}

                        {/* Replay */}
                        <motion.div
                            className="about-replay-wrapper"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <button className="about-replay-btn" onClick={handleReplay}>
                                <svg
                                    className="replay-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="1 4 1 10 7 10" />
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                                </svg>
                                <span>{t('aboutIntro.replay')}</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;
