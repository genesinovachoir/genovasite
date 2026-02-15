import React from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from './OptimizedImage';
import './ImpactCTA.css';

const ImpactCTA = () => {
    const { t } = useTranslation();

    return (
        <section className="impact-cta">
            <div className="cta-reference-wrapper">
                <OptimizedImage
                    src="/CTA.svg"
                    alt="Abstract Background"
                    className="cta-bg-image-wrapper"
                    imgClassName="cta-bg-image"
                />

                <div className="cta-overlay"></div>

                <div className="cta-frame">
                    {/* Frame border is handled by CSS pseudo-elements */}
                </div>

                <div className="cta-content">
                    <p className="cta-label">{t('home.cta.title')}</p>
                    <h2 className="cta-headline">{t('home.cta.subtitle')}</h2>
                </div>
            </div>
        </section>
    );
};

export default ImpactCTA;
