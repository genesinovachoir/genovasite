import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, speed = 30, className = "" }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartTyping(true);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!startTyping) return;

        let index = 0;
        const intervalId = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed, startTyping]);

    return (
        <span className={className} style={{ position: 'relative', display: 'inline-block' }}>
            {displayedText}
        </span>
    );
};

export default TypewriterText;
