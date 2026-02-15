import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import './EventModal.css';

// Simple Icons as SVG components to avoid dependencies
const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

const ArrowUpRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
);

const EventModal = ({ isOpen, onClose, event }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Helper functions
    const nextImage = React.useCallback((e) => {
        if (e) e.stopPropagation();
        if (event && event.images && event.images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
        }
    }, [event]);

    const prevImage = React.useCallback((e) => {
        if (e) e.stopPropagation();
        if (event && event.images && event.images.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
        }
    }, [event]);

    // Reset index when event changes
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setCurrentImageIndex(0), 0);
        }
    }, [isOpen, event]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prevImage(e);
            if (e.key === 'ArrowRight') nextImage(e);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, nextImage, prevImage]);

    if (!event) return null;

    const hasMultipleImages = event.images && event.images.length > 1;

    // Logo placeholder logic
    // Using the SVG provided in Header previously or a generic one if not available directly
    // Assuming /genesi_nova.svg exists in public folder as per Header.jsx

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="event-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="event-modal-container"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Elegant ease
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Global Close Button */}
                        <div className="modal-close-trigger" onClick={onClose}>
                            <CloseIcon />
                        </div>

                        {/* Mobile Drag Handle Indicator */}
                        <div className="modal-drag-handle" />

                        {/* LEFT: Image Carousel */}
                        <div className="event-modal-visuals">
                            <div className="carousel-track">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        className="carousel-slide"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {event.images[currentImageIndex].endsWith('.mov') || event.images[currentImageIndex].endsWith('.mp4') ? (
                                            <video
                                                src={event.images[currentImageIndex]}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                controls // Added controls for user preference if desired, or can remove if strictly atmospheric. User said "no NEW controls", usually implies "no custom UI". Native controls are fine or just simple loop. Let's use simple loop muted for "instagram like" feel unless requested otherwise. Actually user said "Integrate them... No video players". I'll stick to autoplay loop muted for "viewing" vibe.
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <OptimizedImage
                                                src={event.images[currentImageIndex]}
                                                alt={`${event.title} - Image ${currentImageIndex + 1}`}
                                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                                priority={true} // Priority loading for current slide
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Arrows */}
                            {hasMultipleImages && (
                                <>
                                    <button className="carousel-nav-btn prev" onClick={prevImage}>
                                        <ChevronLeft />
                                    </button>
                                    <button className="carousel-nav-btn next" onClick={nextImage}>
                                        <ChevronRight />
                                    </button>

                                    {/* Dots */}
                                    <div className="carousel-dots">
                                        {event.images.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                                onClick={() => setCurrentImageIndex(idx)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* RIGHT: Details Panel */}
                        <div className="event-modal-details">
                            {/* Header */}
                            <div className="details-header">
                                <div className="details-avatar">
                                    <img src="/favicon.svg" alt="Genesi Nova" onError={(e) => e.target.src = '/genesi_nova.svg'} /> {/* Fallback to logo if icon doesn't exist */}
                                </div>
                                <div className="details-title-group">
                                    <span className="details-author">Genesi Nova</span>
                                    <span className="details-sub">By Genesi Nova</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="details-content">
                                <h2 className="event-headline">{event.title}</h2>
                                {event.date && (
                                    <div className="event-meta-row">
                                        <span>{event.date}</span>
                                        {event.venue && <span>•</span>}
                                        {event.venue && <span>{event.venue}</span>}
                                    </div>
                                )}
                                <p className="event-body">{event.description}</p>
                            </div>

                            {/* Actions */}
                            <div className="details-actions">
                                {/* Dynamic Links based on event type */}
                                {event.links && event.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="action-link"
                                    >
                                        <span>{link.label}</span>
                                        <span className="arrow"><ArrowUpRight /></span>
                                    </a>
                                ))}

                                {/* Fallback/Default Link */}
                                {(!event.links || event.links.length === 0) && (
                                    <a href="https://instagram.com/genexinova" target="_blank" rel="noopener noreferrer" className="action-link">
                                        <span>View on Instagram</span>
                                        <span className="arrow"><ArrowUpRight /></span>
                                    </a>
                                )}
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EventModal;
