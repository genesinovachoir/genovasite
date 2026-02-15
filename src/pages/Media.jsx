import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import EventModal from '../components/EventModal';
import './Media.css';

const Media = () => {
    const { t } = useTranslation();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => setSelectedEvent(event);
    const closeModal = () => setSelectedEvent(null);

    // Consolidating all media into "Events"
    const MEDIA_EVENTS = [
        {
            id: 'holyween',
            title: t('media.events.holyween.title'),
            category: t('media.events.holyween.category'),
            date: t('media.events.holyween.date'),
            venue: 'En Passant, Beyoğlu',
            description: t('media.events.holyween.description'),
            images: [
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945200/10_zbkzcd.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945202/11_lbchr0.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945202/8_pbopqq.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945201/9_nwobjl.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945200/7_q8k0e5.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945199/6_o9a5tp.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945198/5_g4fqc3.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1766945198/4_tfchzd.jpg',
                'https://res.cloudinary.com/dfwioqqgc/video/upload/v1766945650/IMG_6199_hvib3p.mov',
                'https://res.cloudinary.com/dfwioqqgc/video/upload/v1766945639/IMG_6171_izcsrn.mov'
            ],
            links: [
                { label: t('media.events.holyween.link'), url: 'https://www.instagram.com/p/DQmlndDjIE9/', type: 'primary' }
            ],
            type: 'performance'
        },
        {
            id: 'vocal-painting-workshop',
            title: t('media.events.workshop.title'),
            category: t('media.events.workshop.category'),
            date: t('media.events.workshop.date'),
            venue: 'Base Gastro Pub, Beyoğlu',
            description: t('media.events.workshop.description'),
            images: [
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974490/WhatsApp_Image_2026-02-01_at_22.16.27_nv5w0y.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974489/WhatsApp_Image_2026-02-01_at_22.16.28_1_b8esqo.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974487/WhatsApp_Image_2026-02-01_at_22.16.27_2_ey0hm4.jpg',
                'https://res.cloudinary.com/dfwioqqgc/image/upload/v1769974487/WhatsApp_Image_2026-02-01_at_22.16.27_1_wg3bsw.jpg',
                'https://res.cloudinary.com/dfwioqqgc/video/upload/v1769974519/WhatsApp_Video_2026-02-01_at_22.17.02_k4hpsl.mp4',
                'https://res.cloudinary.com/dfwioqqgc/video/upload/v1769974515/WhatsApp_Video_2026-02-01_at_22.17.02_1_rrz0ur.mp4'
            ],
            links: [
                { label: t('media.events.workshop.link'), url: 'https://www.instagram.com/p/DKaHE-rsWWP/?img_index=1', type: 'primary' }
            ],
            type: 'workshop'
        }
    ];

    return (
        <div className="media-page">
            <section className="media-hero">
                <div className="container">
                    <motion.div
                        className="media-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="media-eyebrow">{t('media.hero.eyebrow')}</span>
                        <h1 className="media-headline">{t('media.hero.headline')}</h1>
                        <p className="media-subtitle">{t('media.hero.subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            <section className="media-grid-section">
                <div className="container">
                    <div className="media-grid">
                        <AnimatePresence mode="popLayout">
                            {MEDIA_EVENTS.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="media-card"
                                    onClick={() => openModal(event)}
                                >
                                    <div className="media-thumb-wrapper">
                                        <OptimizedImage
                                            src={event.images[0]}
                                            alt={event.title}
                                            className="media-thumb"
                                        />

                                        <div className="media-expand-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                            </svg>
                                        </div>

                                        <div className="media-overlay">
                                            <span className="media-category">{event.category}</span>
                                            <h3 className="media-item-title">{event.title}</h3>
                                            <span className="media-cta-hint">{t('media.view_event')} →</span>
                                        </div>
                                    </div>
                                    <div className="event-info-snippet">
                                        <div className="event-meta">
                                            <span className="event-date">{event.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <EventModal
                isOpen={!!selectedEvent}
                onClose={closeModal}
                event={selectedEvent}
            />
        </div>
    );
};

export default Media;
