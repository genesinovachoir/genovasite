import React from 'react';
import { motion } from 'framer-motion';

const IntroProgressBar = ({ stepIndex, totalSteps }) => {
    const progress = ((stepIndex + 1) / totalSteps) * 100;

    return (
        <div className="intro-progress-track">
            <motion.div
                className="intro-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.4 }}
            />
        </div>
    );
};

export default IntroProgressBar;
