import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './FeaturedPerformance.css';

/**
 * FeaturedPerformance
 * 
 * A reverent showcase of one musical moment.
 * Visual metaphor: "One song on stage under a spotlight."
 */
const FeaturedPerformance = () => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = "_GCj_UDD24Y";

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <section className="featured-performance">
            <div className="container">
                <div className="featured-content">

                    {/* Text Block */}
                    <div className="featured-text">
                        <div className="featured-title-block">
                            <span className="featured-subtitle">
                                {t('home.performance.subtitle')}
                            </span>
                            <h2 className="featured-title">
                                {t('home.performance.title')}
                            </h2>
                        </div>

                        <p className="featured-quote">
                            <Trans i18nKey="home.performance.quote" components={{ br: <br /> }} />
                            <br />
                            {t('home.performance.description')}
                        </p>
                    </div>

                    {/* Video Block */}
                    <div className="featured-video-container">
                        <div className="featured-video-frame">
                            {!isPlaying ? (
                                <button
                                    className="featured-video-preview"
                                    onClick={handlePlay}
                                    aria-label="Play Çanakkale Türküsü performance"
                                >
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                        alt="Çanakkale Türküsü — Genesi Nova"
                                        className="featured-thumbnail"
                                        loading="lazy"
                                    />
                                    <div className="featured-play-button">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="play-icon"
                                            aria-hidden="true"
                                        >
                                            <path d="M8 5v14l11-7z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </button>
                            ) : (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                    title="Çanakkale Türküsü — Genesi Nova Performance"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="featured-iframe"
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedPerformance;
