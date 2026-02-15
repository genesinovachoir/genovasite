import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OptimizedImage from './OptimizedImage';
import './ShopSection.css';

const ShopSection = () => {
    const { t } = useTranslation();

    const items = [
        {
            id: 1,
            subtitle: t('store.items.kirmizi.subtitle'),
            title: t('store.items.kirmizi.title'),
            desc: t('store.items.kirmizi.desc'),
            image: "/shop/arr1.webp"
        },
        {
            id: 2,
            subtitle: t('store.items.canakkale.subtitle'),
            title: t('store.items.canakkale.title'),
            desc: t('store.items.canakkale.desc'),
            image: "/shop/arr2.webp"
        },
        {
            id: 3,
            subtitle: t('store.items.amasya.subtitle'),
            title: t('store.items.amasya.title'),
            desc: t('store.items.amasya.desc'),
            image: "/shop/arr3.webp"
        }
    ];

    return (
        <section id="store" className="shop-section">
            <div className="container">
                <header className="shop-header">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="shop-subtitle">{t('store.header.subtitle')}</div>
                        <h2 className="shop-title">{t('store.header.title')}</h2>
                    </motion.div>
                </header>

                <div className="gallery-grid">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="gallery-grid-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="gallery-card">
                                <div className="card-image-wrapper">
                                    <OptimizedImage
                                        src={item.image}
                                        alt="Locked Content"
                                        className="card-img-locked"
                                    />
                                    <div className="locked-overlay">
                                        <div className="lock-badge">
                                            <span className="lock-icon">🔒</span>
                                        </div>
                                    </div>
                                    <div className="hover-reveal-content">
                                        <p className="reveal-text">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <span className="card-subtitle">{item.subtitle}</span>
                                    <h3 className="card-title">{item.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="shop-footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <div className="footer-line"></div>
                    <p className="footer-text">{t('store.footer.status')}</p>
                    <p className="coming-soon-glow">{t('store.footer.opening')}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopSection;
