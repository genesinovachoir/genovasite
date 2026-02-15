import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import OptimizedImage from './OptimizedImage';
import { POSTS } from '../data/blogPosts';
import './BlogUpdates.css';
import instagramIcon from '../assets/icons/instagram.svg';
import twitterIcon from '../assets/icons/twitter.svg';

const BlogUpdates = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    // We only want to show the latest 3 updates
    const displayPosts = POSTS.slice(0, 3);

    const handlePrev = () => {
        setDirection(-1);
        setCurrentSlide(prev => (prev === 0 ? displayPosts.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentSlide(prev => (prev === displayPosts.length - 1 ? 0 : prev + 1));
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <section className="blog-updates section">
            <div className="container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            color: '#fff', // Changed from var(--color-primary) to white for visibility
                            marginBottom: '0.5rem'
                        }}>
                            From the Notebook
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-primary)',
                            color: 'var(--color-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '0.8rem'
                        }}>
                            Latest Stories & Updates
                        </p>
                    </div>

                    {/* Desktop Layout: Grid */}
                    <div className="home-blog-grid">
                        {displayPosts.map((post) => (
                            <BlogCard key={post.id} post={post} navigate={navigate} />
                        ))}
                    </div>

                    {/* Mobile Layout: Slider */}
                    <div className="mobile-slider-container">
                        <div className="mobile-slide-track">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    <BlogCard post={displayPosts[currentSlide]} navigate={navigate} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mobile-slider-controls">
                            <button
                                onClick={handlePrev}
                                className="slider-arrow"
                                aria-label="Previous Post"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            {/* Simple Dots Indicator */}
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {displayPosts.map((_, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: idx === currentSlide ? 'var(--color-secondary)' : 'rgba(255,255,255,0.2)',
                                            transform: idx === currentSlide ? 'scale(1.2)' : 'scale(1)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="slider-arrow"
                                aria-label="Next Post"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </ScrollReveal>
            </div>
        </section>
    );
};

// Reusable Card Component for this section
const BlogCard = ({ post, navigate }) => {
    return (
        <article
            className="home-blog-card"
            onClick={() => navigate(`/blog/${post.id}`)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/blog/${post.id}`);
                }
            }}
        >
            <div className="home-blog-card-image-wrapper">
                <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="home-blog-card-img"
                    sizes="(min-width: 768px) 33vw, 100vw"
                />
            </div>

            <div className="home-blog-card-content">
                <div className="home-blog-card-meta">
                    <span className="category">{post.category}</span>
                    <span className="divider">•</span>
                    <span className="read-time">{post.readTime}</span>
                </div>

                <h3 className="home-blog-card-title">
                    {post.title}
                </h3>

                <p className="home-blog-card-excerpt">
                    {post.excerpt}
                </p>

                <div className="home-author-metadata">
                    <div className="author-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                        <div
                            className="home-author-avatar"
                            style={{ backgroundColor: post.author.avatarColor }}
                        >
                            {post.author.initials}
                        </div>
                        <div className="home-author-details">
                            <span className="home-author-name">{post.author.name}</span>
                            <time className="home-post-date">{post.date}</time>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="home-author-social" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <a
                            href={post.author.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                        <a
                            href={post.author.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={twitterIcon} alt="Twitter" />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogUpdates;
