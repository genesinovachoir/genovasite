import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StarfieldBackground from './StarfieldBackground';
import IntroProgressBar from './IntroProgressBar';

const TOTAL_STEPS = 10;
const STEP_DURATION = 1700; // ms per step (~15.3s total)
const LOGO_DISPLAY_DURATION = 1700; // ms to hold the logo

const IntroOverlay = ({ onComplete }) => {
    const { t } = useTranslation();
    const [stepIndex, setStepIndex] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef(null);
    const volumeIntervalRef = useRef(null);

    // Audio Helpers
    const clearVolumeInterval = () => {
        if (volumeIntervalRef.current) {
            clearInterval(volumeIntervalRef.current);
            volumeIntervalRef.current = null;
        }
    };

    const fadeInAudio = () => {
        if (!audioRef.current) return;
        clearVolumeInterval();

        if (audioRef.current.paused) {
            audioRef.current.volume = 0;
        }

        const fadeTime = 400;
        const steps = 20;
        const stepTime = fadeTime / steps;
        const volStep = 1 / steps;

        volumeIntervalRef.current = setInterval(() => {
            if (!audioRef.current) return;

            let newVol = audioRef.current.volume + volStep;
            if (newVol >= 1) {
                newVol = 1;
                clearVolumeInterval();
            }
            audioRef.current.volume = newVol;
        }, stepTime);
    };

    const fadeOutAudio = useCallback(() => {
        if (!audioRef.current) return;
        clearVolumeInterval();

        const fadeTime = 400;
        const steps = 20;
        const stepTime = fadeTime / steps;
        const startVol = audioRef.current.volume;
        const volStep = startVol / steps;

        volumeIntervalRef.current = setInterval(() => {
            if (!audioRef.current) return;

            let newVol = audioRef.current.volume - volStep;
            if (newVol <= 0.01) {
                newVol = 0;
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                clearVolumeInterval();
            } else {
                audioRef.current.volume = newVol;
            }
        }, stepTime);
    }, []);

    // Initialize Audio
    useEffect(() => {
        const audio = new Audio("/audio/about.mp3");
        audio.preload = "auto";
        audio.volume = 0;
        audio.loop = false;
        audioRef.current = audio;

        // Try to play
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started!
                fadeInAudio();
            }).catch(error => {
                // Autoplay was prevented
                console.log("Audio autoplay prevented (user interaction needed):", error);
                // Do not force mute state UI, let user click to toggle if needed
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            clearVolumeInterval();
        };
    }, []);

    // Handle Mute Toggle
    const toggleMute = () => {
        if (!audioRef.current) return;

        const newMuted = !isMuted;
        setIsMuted(newMuted);

        // Update audio object
        audioRef.current.muted = newMuted;

        // If unmuting and it was paused (due to autoplay block), try playing
        if (!newMuted && audioRef.current.paused) {
            audioRef.current.play().then(() => {
                fadeInAudio();
            }).catch(e => console.error("Play failed:", e));
        }
    };

    const handleComplete = useCallback(() => {
        if (isExiting) return;

        // Start fading out audio immediately
        fadeOutAudio();

        setIsExiting(true);
        sessionStorage.setItem('aboutIntroSeen', '1');

        // Let exit animation play, then unmount
        setTimeout(() => {
            onComplete();
        }, 600);
    }, [onComplete, isExiting, fadeOutAudio]);

    // Auto-advance steps
    useEffect(() => {
        if (isExiting || showLogo) return;

        const timer = setTimeout(() => {
            if (stepIndex < TOTAL_STEPS - 1) {
                setStepIndex(prev => prev + 1);
            } else {
                // Final step done → show logo
                setShowLogo(true);
            }
        }, STEP_DURATION);

        return () => clearTimeout(timer);
    }, [stepIndex, isExiting, showLogo, handleComplete]);

    // Logo hold timer
    useEffect(() => {
        if (!showLogo || isExiting) return;

        const timer = setTimeout(() => {
            handleComplete();
        }, LOGO_DISPLAY_DURATION);

        return () => clearTimeout(timer);
    }, [showLogo, isExiting, handleComplete]);

    const handleSkip = () => {
        handleComplete();
    };

    const stepKey = `aboutIntro.step${stepIndex + 1}`;

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="intro-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <StarfieldBackground />

                    {/* Progress bar */}
                    <IntroProgressBar stepIndex={stepIndex} totalSteps={TOTAL_STEPS} />

                    {/* Mute Toggle (Top Left) */}
                    <button
                        className="intro-audio-toggle"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <line x1="23" y1="9" x2="17" y2="15"></line>
                                <line x1="17" y1="9" x2="23" y2="15"></line>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                        )}
                    </button>

                    {/* Skip button (Top Right) */}
                    <button className="intro-skip-btn" onClick={handleSkip}>
                        {t('aboutIntro.skip')}
                    </button>

                    {/* Center stage */}
                    <div className="intro-text-stage">
                        <AnimatePresence mode="wait">
                            {!showLogo ? (
                                <motion.p
                                    key={stepIndex}
                                    className="intro-step-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {t(stepKey)}
                                </motion.p>
                            ) : (
                                <motion.img
                                    key="logo"
                                    src="/genesi_nova.svg"
                                    alt="Genesi Nova"
                                    className="intro-logo-reveal"
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: 'easeOut' }}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroOverlay;
