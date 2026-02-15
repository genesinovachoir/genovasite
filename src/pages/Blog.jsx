import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import TypewriterText from '../components/TypewriterText';
import OptimizedImage from '../components/OptimizedImage';
import HeroTypewriterHeadlines from '../components/HeroTypewriterHeadlines';
import './Blog.css';

// Import Assets
// Import Assets
import manifest from '../lib/media/manifest.json';
import instagramIcon from '../assets/icons/instagram.svg';
import twitterIcon from '../assets/icons/twitter.svg';

const blogMain = manifest['blog-hero'];
const choirImg = manifest['choir-hero'];
const podcastImg = manifest['podcast-hero'];
// Reuse the same assets for small versions, the component handles sizing
const blogSmall = manifest['blog-hero'];
const choirSmall = manifest['choir-hero'];

import { POSTS } from '../data/blogPosts';
import { useTranslation } from 'react-i18next';

// Fallback headlines if POSTS is empty (though unlikely)
const FALLBACK_HEADLINES = {
    en: [
        "The Resurgence of Polyphony in Modern Pop",
        "Echoes from the Past: The Making of Our New Album",
        "The Science of Harmony: Why We Love Chords",
        "Vocal Health 101 for Touring Choirs"
    ],
    tr: [
        "Modern Popta Polifoninin Yeniden Doğuşu",
        "Geçmişten Yankılar: Yeni Albümümüzün Hazırlığı",
        "Armoni Bilimi: Akorları Neden Seviyoruz?",
        "Korolar İçin Ses Sağlığı Rehberi"
    ]
};

const Blog = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'tr';

    const navigate = useNavigate();
    // Refs for dynamic typewriter positioning
    const subscribeCtaRef = useRef(null);
    const notebookRef = useRef(null);
    const introRef = useRef(null);
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

    // Parallax Logic matching Home Page
    const { scrollYProgress } = useScroll({
        target: introRef,
        offset: ["start start", "end start"]
    });

    // Dynamically get headlines from real blog posts
    // We prioritize real post titles, fall back to language-specific defaults
    const TYPEWRITER_HEADLINES = POSTS.length > 0
        ? POSTS.map(post => post.title)
        : (FALLBACK_HEADLINES[currentLang] || FALLBACK_HEADLINES.en);

    const yContent = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "100%"]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0]);



    const handleSubscribeScroll = () => {
        const newsletterSection = document.getElementById('newsletter-section');
        if (newsletterSection) {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Mobile: Custom scroll with larger offset to prevent footer overshoot
                const targetPosition = newsletterSection.getBoundingClientRect().top + window.pageYOffset;
                const offset = 180; // Generous offset for mobile - lands above footer
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            } else {
                // Desktop: Use scrollIntoView with scroll-margin-top
                newsletterSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                    // Respects scroll-margin-top CSS property for proper offset
                });
            }

            newsletterSection.classList.add('highlight-subtly');
            setTimeout(() => {
                newsletterSection.classList.remove('highlight-subtly');
            }, 2000);
        }
    };

    return (
        <div className="blog-page">
            <main>
                {/* Intro Section - Editorial Opening */}
                <section
                    ref={introRef}
                    className="blog-intro-section"
                    style={{
                        position: 'relative',
                        zIndex: 10
                    }}
                >
                    <motion.div
                        style={{
                            y: yContent,
                            opacity: opacityContent,
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            willChange: 'transform, opacity'
                        }}
                    >
                        <div className="blog-intro-content">
                            <motion.div
                                className="blog-eyebrow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                The Notebook
                            </motion.div>
                            <motion.h1
                                className="blog-intro-headline"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Ideas behind the music,
                                <br />
                                <span className="italic">Inspirations shaping our journey.</span>
                            </motion.h1>

                            <motion.button
                                ref={subscribeCtaRef}
                                className="blog-intro-cta"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                onClick={handleSubscribeScroll}
                            >
                                Subscribe to our Notebook
                            </motion.button>
                        </div>

                        {/* Center-Screen Typewriter Headlines */}
                        <HeroTypewriterHeadlines
                            headlines={TYPEWRITER_HEADLINES}
                            subscribeRef={subscribeCtaRef}
                            notebookRef={notebookRef}
                        />

                        {/* Notebook Icon - Bottom Positioned */}
                        <motion.div
                            ref={notebookRef}
                            className="notebook-group"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1.5 }}
                            onClick={() => {
                                const target = document.getElementById('blog-grid');
                                if (target) {
                                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                                    const offset = 100;
                                    window.scrollTo({
                                        top: targetPosition - offset,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                        >
                            <img
                                src="/arrow.svg"
                                alt="Scroll Down"
                                style={{
                                    width: '24px',
                                    height: 'auto',
                                    opacity: 0.8,
                                    filter: 'brightness(0) invert(1)',
                                    marginBottom: '8px'
                                }}
                            />
                            <span className="notebook-label">READ OUR NOTEBOOK</span>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Main Grid */}
                <div id="blog-grid" className="blog-grid" style={{ marginTop: '4rem' }}>
                    {POSTS.slice(0, 3).map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 0.1}>
                            <div
                                className="blog-card"
                                onClick={() => navigate(`/blog/${post.id}`)}
                                role="link"
                                tabIndex={0}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="blog-card-image-wrapper">
                                    <OptimizedImage
                                        src={post.image}
                                        alt={post.title}
                                        className="blog-card-img"
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    />
                                </div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="category-tag">{post.category}</span>
                                        <span className="divider">•</span>
                                        <span className="read-time">{post.readTime}</span>
                                    </div>
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    {/* Author Metadata Block */}
                                    <div className="author-metadata">
                                        <div className="author-info">
                                            <div
                                                className="author-avatar"
                                                style={{ backgroundColor: post.author.avatarColor }}
                                            >
                                                {post.author.initials}
                                            </div>
                                            <div className="author-details">
                                                <div className="author-name">{post.author.name}</div>
                                                <time className="post-date">{post.date}</time>
                                            </div>
                                        </div>
                                        <div className="author-social">
                                            <span className="follow-label">Follow</span>
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
                            </div>
                        </ScrollReveal>
                    ))}


                </div>
            </main>
        </div>
    );
};

export default Blog;
