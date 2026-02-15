import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './EventCalendar.css';

const EVENTS = [
    {
        id: 1,
        title: 'Yüz Yüze Seçmeler',
        type: 'Selection',
        date: '23–27',
        month: 'Feb',
        year: '2026',
        location: 'Kulüpler Vadisi',
        capacity: '—'
    },
    {
        id: 2,
        title: 'Şalter x GeNova',
        type: 'Concert',
        date: '28',
        month: 'Mar',
        year: '2026',
        location: 'Ortaköy Kethüda Hamamı',
        capacity: '150–250'
    },
    {
        id: 3,
        title: 'Ruhi Su x GeNova',
        type: 'Concert',
        date: '03',
        month: 'Apr',
        year: '2026',
        location: 'Bakırköy Cem Karaca Kültür Merkezi',
        capacity: '460'
    },
    {
        id: 4,
        title: 'KVK x GeNova Bağış Konseri',
        type: 'Concert',
        date: '08',
        month: 'Apr',
        year: '2026',
        location: 'YTÜ Davutpaşa Kongre Merkezi',
        capacity: '800–1000'
    },
    {
        id: 5,
        title: '11. SANSEV Uluslararası Koro Festivali',
        type: 'Festival',
        date: '07–10',
        month: 'May',
        year: '2026',
        location: 'Maltepe Türkan Saylan Kültür Merkezi',
        capacity: '400–500'
    },
    {
        id: 6,
        title: 'Acıbadem Üniversitesi Koro Festivali',
        type: 'Festival',
        date: '13',
        month: 'May',
        year: '2026',
        location: 'Acıbadem Üni. Konferans Merkezi',
        capacity: '750'
    },
    {
        id: 7,
        title: 'AAS Uluslararası Koro Festivali',
        type: 'Festival',
        date: '21–24',
        month: 'May',
        year: '2026',
        location: 'AAS Sanat Merkezi, İzmir',
        capacity: '1130'
    }
];

const EventCalendar = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [gap, setGap] = useState(32); // 2rem = 32px
    const trackRef = useRef(null);
    const controls = useAnimation();
    const x = useMotionValue(0);

    // Responsive Logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
                setGap(16); // 1rem
            } else {
                setItemsPerPage(3);
                setGap(32); // 2rem
            }
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ensure index doesn't go out of bounds when resizing
    useEffect(() => {
        const maxIndex = Math.max(0, EVENTS.length - itemsPerPage);
        if (index > maxIndex) {
            setIndex(maxIndex);
        }
    }, [itemsPerPage, index]);

    // Calculate Movement
    const maxIndex = Math.max(0, EVENTS.length - itemsPerPage);

    const slideTo = (newIndex) => {
        const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
        setIndex(clampedIndex);
    };

    const handleNext = () => slideTo(index + 1);
    const handlePrev = () => slideTo(index - 1);

    const onDragEnd = (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -100 || velocity < -500) {
            handleNext();
        } else if (offset > 100 || velocity > 500) {
            handlePrev();
        }
    };

    return (
        <section className="event-calendar-section">
            <div className="event-calendar-container">
                <div className="event-calendar-header">
                    <span className="event-calendar-eyebrow">{t('calendar.eyebrow')}</span>
                    <h2 className="event-calendar-title">{t('calendar.season')} 2026</h2>
                </div>

                <div className="calendar-carousel-wrapper">
                    <motion.div
                        className="calendar-track"
                        animate={{
                            x: `calc(-${index} * ((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage} + ${gap}px))`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }} // Just for triggering dragEnd
                        dragElastic={0.1}
                        onDragEnd={onDragEnd}
                        ref={trackRef}
                    >
                        {EVENTS.map((event) => (
                            <motion.div
                                key={event.id}
                                className="event-card"
                            >
                                <div className="card-top">
                                    <div className="card-date-group">
                                        <span className="card-date-numerals">{event.date}</span>
                                        <span className="card-date-month">{t(`calendar.months.${event.month}`)} {event.year}</span>
                                    </div>
                                    <span className="card-type">{t(`calendar.types.${event.type}`)}</span>
                                    <h3 className="card-title">{event.title}</h3>
                                </div>

                                <div className="card-meta-group">
                                    <div className="meta-row">
                                        <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        <span>{event.location}</span>
                                    </div>
                                    {/* Always render capacity row for consistent spacing */}
                                    {event.capacity && event.capacity !== '—' ? (
                                        <div className="meta-row">
                                            <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            <span>{event.capacity} {t('calendar.capacity_unit')}</span>
                                        </div>
                                    ) : (
                                        <div className="meta-row" style={{ opacity: 0, pointerEvents: 'none' }}>
                                            {/* Invisible placeholder to maintain spacing */}
                                            <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            </svg>
                                            <span>&nbsp;</span>
                                        </div>
                                    )}
                                </div>

                                <div className="card-actions">
                                    <button className="details-btn">{t('calendar.details')}</button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Unified Navigation Controls */}
                <div className="calendar-navigation">
                    <button
                        className="nav-arrow prev"
                        onClick={handlePrev}
                        disabled={index === 0}
                        aria-label="Previous Events"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="calendar-dots">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <div
                                key={i}
                                className={`dot ${i === index ? 'active' : ''}`}
                                onClick={() => slideTo(i)}
                            />
                        ))}
                    </div>

                    <button
                        className="nav-arrow next"
                        onClick={handleNext}
                        disabled={index === maxIndex}
                        aria-label="Next Events"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EventCalendar;
