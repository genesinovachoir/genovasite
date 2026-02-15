import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import './ColumnNav.css';

// Image paths (Using files from public directory)
const podcastImg = '/podcast.svg';
const choirImg = '/choir.svg';
const blogImg = '/blog.svg';

const items = [
    {
        id: 'podcast',
        title: 'Podcast',
        subtitle: 'Listen & Explore',
        description: 'Dive into deep conversations about music, culture, and the stories behind our choir.',
        link: '/podcast', // Updated to match routing if needed, keeping hash for now if unsure
        image: podcastImg
    },
    {
        id: 'choir',
        title: 'Choir',
        subtitle: 'Korosu',
        description: 'Meet the diverse voices and talents that make up the harmonious soul of our group.',
        link: '/about',
        image: choirImg
    },
    {
        id: 'blog',
        title: 'Blog',
        subtitle: 'Read Our Stories',
        description: 'Latest updates, backstage moments, and articles on polyphonic traditions.',
        link: '/blog',
        image: blogImg
    }
];

const ColumnNav = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section className="column-nav-section">
            <div className="column-nav-container">
                {items.map((item) => (
                    <NavCard
                        key={item.id}
                        item={item}
                        isHovered={hoveredId === item.id}
                        isAnyHovered={!!hoveredId}
                        onHoverStart={() => setHoveredId(item.id)}
                        onHoverEnd={() => setHoveredId(null)}
                    />
                ))}
            </div>
        </section>
    );
};

const NavCard = ({ item, isHovered, isAnyHovered, onHoverStart, onHoverEnd }) => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            className="nav-card"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onMouseMove={handleMouseMove}
            layout
            initial={{ flex: 1 }}
            animate={{
                flex: isHovered ? 2.5 : 1,
                opacity: isAnyHovered && !isHovered ? 0.6 : 1,
                scale: isAnyHovered && !isHovered ? 0.98 : 1,
                y: isHovered ? -15 : 0
            }}
            transition={{
                duration: 0.7,
                ease: [0.4, 0.0, 0.2, 1],
                layout: { duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }
            }}
        >
            {/* Background Image Layer - Optimized */}
            <motion.div
                className="nav-bg-scaler"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
                animate={{
                    scale: isHovered ? 1.0 : 1.15
                }}
                transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
            >
                <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="nav-bg-image-opt"
                    style={{ width: '100%', height: '100%' }}
                />
                <div className="nav-overlay" />
            </motion.div>

            {/* Content Layer */}
            <motion.div className="nav-content">

                <motion.h3
                    className="nav-title"
                    style={{ fontSize: '2.5rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}
                >
                    {item.title}
                </motion.h3>

                {item.subtitle && (
                    <motion.span
                        className="nav-subtitle"
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                    >
                        {item.subtitle}
                    </motion.span>
                )}

                {/* Decorative Separator */}
                <motion.div
                    className="nav-divider"
                    style={{ margin: '2rem 0' }}
                >
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10C15 10 20 0 30 0C40 0 45 10 60 10" stroke="var(--color-secondary)" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="30" cy="15" r="2" fill="var(--color-secondary)" />
                    </svg>
                </motion.div>

                {/* Description Text */}
                <motion.div>
                    <p className="nav-description-text">
                        {item.description}
                    </p>
                </motion.div>

                {/* Discover Button - Animated layout and blur */}
                <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0, backdropFilter: "blur(0px)" }}
                    animate={{
                        height: isHovered ? 'auto' : 0,
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? '2rem' : 0,
                        backdropFilter: isHovered ? "blur(5px)" : "blur(0px)"
                    }}
                    transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden', willChange: 'height, opacity' }}
                >
                    <a href={item.link} className="nav-discover-btn" style={{ backdropFilter: 'none' }}>
                        Discover Now
                    </a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ColumnNav;
