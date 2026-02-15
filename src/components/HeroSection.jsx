import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TypewriterText from './TypewriterText';
import OptimizedImage from './OptimizedImage';
import './HeroSection.css';

const HeroSection = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Properly detect mobile devices with useEffect
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Check on mount
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Only apply parallax transforms on desktop for smooth mobile scrolling
    const yBg = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0]);

    return (
        <header
            ref={ref}
            id="home"
            className="hero"
            style={{
                // GPU compositing for smoother rendering
                willChange: 'transform',
                transform: 'translateZ(0)'
            }}
        >
            {/* Parallax Background - Velvet Effect */}
            <motion.div
                className="hero-bg"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    y: yBg,
                    zIndex: 1,
                    background: 'transparent',
                    willChange: isMobile ? 'auto' : 'transform'
                }}
            />

            {/* Decorative Elements */}


            {/* Main Content - Empty for now as requested for Full-Width Visual */}
            <motion.div
                className="container"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    color: '#fff',
                    y: yText,
                    opacity: opacityText,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    willChange: isMobile ? 'auto' : 'transform, opacity'
                }}
            >
                {/* Centered Content Block */}
                <div style={{
                    position: 'absolute',
                    top: '42%', /* Slightly higher visual center for laptop screens */
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    zIndex: 20
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)', /* Optimized clamp for 13" screens */
                        fontWeight: 700,
                        lineHeight: 1,
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-0.02em',
                        color: '#fff',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        <span style={{ display: 'block', overflow: 'hidden' }}>
                            <motion.span
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                style={{ display: 'block' }}
                            >
                                {t('home.hero.title_part1')}
                            </motion.span>
                        </span>
                        <span style={{ display: 'block', overflow: 'hidden', marginTop: '-0.2em' }}>
                            <motion.span
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                style={{ display: 'block', fontStyle: 'italic', opacity: 0.9, color: 'var(--color-secondary)' }}
                            >
                                {t('home.hero.title_part2')}
                            </motion.span>
                        </span>
                    </h1>

                    <div style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                        fontWeight: 400,
                        color: 'rgba(255, 255, 255, 0.9)',
                        maxWidth: '800px',
                        lineHeight: 1.6,
                        letterSpacing: '0.05em',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        textTransform: 'uppercase'
                    }}>
                        <div style={{ overflow: 'hidden' }}>
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {t('home.hero.tagline1')}
                            </motion.div>
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {t('home.hero.tagline2')}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Locations / Bottom Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    style={{
                        position: 'absolute',
                        bottom: '8vh', /* Uses viewport height unit for responsiveness */
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.3rem'
                    }}
                >
                    <div style={{ width: '150px', maxWidth: '40px', opacity: 0.9 }}>
                        <OptimizedImage
                            src="/based_in_istanbul.svg"
                            alt="Istanbul"
                            priority={true}
                            width={150}
                            height={100}
                        />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                        {t('home.hero.location')}
                    </span>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}

        </header>
    );
};

export default HeroSection;
