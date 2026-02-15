import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './HeroTypewriterHeadlines.css';

const HeroTypewriterHeadlines = ({
    headlines,
    typingSpeed = 80,
    deleteSpeed = 30,
    pauseDuration = 500,
    subscribeRef,
    notebookRef
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [topPosition, setTopPosition] = useState(null);
    const typewriterRef = useRef(null);

    // Calculate exact midpoint position
    const calculatePosition = useCallback(() => {
        if (!subscribeRef?.current || !notebookRef?.current || !typewriterRef.current) {
            return;
        }

        // Get the bottom Y of the Subscribe CTA
        const subscribeRect = subscribeRef.current.getBoundingClientRect();
        const subscribeBottomY = subscribeRect.bottom;

        // Get the center Y of the notebook icon
        const notebookRect = notebookRef.current.getBoundingClientRect();
        const notebookCenterY = notebookRect.top + (notebookRect.height / 2);

        // Calculate the midpoint
        const midpointY = (subscribeBottomY + notebookCenterY) / 2;

        // Get the typewriter's height to center it properly
        const typewriterHeight = typewriterRef.current.offsetHeight;

        // Calculate the top position so typewriter's center is at midpoint
        // We need to convert viewport Y to position relative to parent
        const parentRect = typewriterRef.current.parentElement.getBoundingClientRect();
        const relativeTop = midpointY - parentRect.top - (typewriterHeight / 2);

        setTopPosition(relativeTop);
    }, [subscribeRef, notebookRef]);

    // Calculate position on mount, resize, orientation change, and after fonts load
    useEffect(() => {
        // Initial calculation with delay for fonts
        const initialTimer = setTimeout(calculatePosition, 100);

        // Recalculate after fonts definitely loaded
        const fontTimer = setTimeout(calculatePosition, 500);

        // Handle resize
        const handleResize = () => {
            calculatePosition();
        };

        // Use ResizeObserver for more reliable detection
        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                calculatePosition();
            });

            if (subscribeRef?.current) {
                resizeObserver.observe(subscribeRef.current);
            }
            if (notebookRef?.current) {
                resizeObserver.observe(notebookRef.current);
            }
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Listen for font loading
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(calculatePosition);
        }

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(fontTimer);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [calculatePosition, subscribeRef, notebookRef]);

    // Typewriter animation logic
    useEffect(() => {
        const currentHeadline = headlines[currentIndex];

        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(pauseTimer);
        }

        if (!isDeleting && displayText === currentHeadline) {
            // Avoid synchronous state update
            const timer = setTimeout(() => {
                setIsPaused(true);
            }, 0);
            return () => clearTimeout(timer);
        }

        if (isDeleting && displayText === '') {
            setTimeout(() => {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % headlines.length);
            }, 0);
            return;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setDisplayText(currentHeadline.substring(0, displayText.length - 1));
            } else {
                setDisplayText(currentHeadline.substring(0, displayText.length + 1));
            }
        }, isDeleting ? deleteSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isPaused, currentIndex, headlines, typingSpeed, deleteSpeed, pauseDuration]);

    return (
        <motion.div
            ref={typewriterRef}
            className="hero-typewriter"
            style={{
                position: 'absolute',
                top: topPosition !== null ? `${topPosition}px` : '50%',
                left: '50%',
                transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
        >
            <span className="typewriter-text">
                {displayText}
                <span className="typewriter-cursor">|</span>
            </span>
        </motion.div>
    );
};

export default HeroTypewriterHeadlines;
