import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import { supabase } from '../lib/supabaseClient';
import './Collab.css';

const Collab = () => {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const collaborationOptions = [
        {
            id: 'invite',
            label: t('collab.form.options.invite'),
            placeholder: t('collab.form.placeholders.invite')
        },
        {
            id: 'create',
            label: t('collab.form.options.create'),
            placeholder: t('collab.form.placeholders.create')
        },
        {
            id: 'sponsor',
            label: t('collab.form.options.sponsor'),
            placeholder: t('collab.form.placeholders.sponsor')
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedOption) return;

        setStatus('submitting');

        try {
            const { error } = await supabase
                .from('collab_inquiries')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        inquiry_type: selectedOption
                    }
                ]);

            if (error) {
                console.error('Supabase insert error:', error);
                setStatus('error');
                // Optional: Show alert or rely on UI error state
                alert(t('collab.form.error') || 'Submission failed. Please try again.');
                return;
            }

            setStatus('success');

            // Scroll to form to show success message
            setTimeout(() => {
                const formSection = document.getElementById('collab-form');
                if (formSection) {
                    formSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);

            // Reset after 5 seconds
            setTimeout(() => {
                setStatus('idle');
                setSelectedOption(null);
                setFormData({ name: '', email: '', message: '' });
            }, 5000);

        } catch (err) {
            console.error('Unexpected error:', err);
            setStatus('error');
            alert('Unexpected error occurred.');
        }
    };

    const scrollToForm = () => {
        const formSection = document.getElementById('collab-form');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="collab-page">

            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="collab-hero">
                <div className="collab-hero-content">
                    <motion.div
                        className="hero-eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t('collab.hero.eyebrow')}
                    </motion.div>

                    <motion.h1
                        className="hero-headline"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Trans i18nKey="collab.hero.headline" components={{ br: <br />, span: <span className="italic" /> }} />
                    </motion.h1>

                    <motion.p
                        className="hero-subtext"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        {t('collab.hero.subtext')}
                    </motion.p>

                    <motion.button
                        className="hero-collab-btn"
                        onClick={scrollToForm}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>{t('collab.hero.cta')}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                PAST COLLABORATION SHOWCASE — ŞALTER
            ═══════════════════════════════════════════════════════════════ */}
            <section className="collab-showcase">
                <div className="showcase-container">

                    {/* Event Title & Meta Info */}
                    <motion.div
                        className="showcase-intro"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="event-title">{t('collab.showcase.title')}</h2>
                        <div className="showcase-meta">
                            <div className="meta-item">
                                <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <time className="meta-date">01.11.2025</time>
                            </div>
                            <span className="meta-divider">—</span>
                            <div className="meta-item">
                                <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span className="meta-venue">{t('collab.showcase.venue')}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Integrated Editorial Divider */}
                    <motion.div
                        className="showcase-divider"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Editorial Layout — Logos Left, Text Right */}
                    <motion.div
                        className="showcase-editorial"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Left: Collaboration Logos - Clickable */}
                        <div className="showcase-brands">
                            <a
                                href="https://www.instagram.com/p/DQw2cMfDPCZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="logo-link"
                            >
                                <OptimizedImage
                                    src="/genesi_nova.svg"
                                    alt="Genesi Nova"
                                    className="brand-logo genesi-logo"
                                />
                            </a>
                            <OptimizedImage
                                src="/collab/X.svg"
                                alt="×"
                                className="collaboration-x"
                            />
                            <a
                                href="https://www.instagram.com/p/DQpKc6RCGq3Zvgt4Zui3AFpzEnAxRryQjbqOnU0/?img_index=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="logo-link"
                            >
                                <OptimizedImage
                                    src="/collab/salter/shalter-logo-white.svg"
                                    alt="Şalter"
                                    className="brand-logo salter-logo"
                                />
                            </a>
                        </div>

                        {/* Right: Editorial Text */}
                        <div className="showcase-text">
                            <p className="showcase-lead">
                                {t('collab.showcase.lead')}
                            </p>
                            <p className="showcase-body">
                                {t('collab.showcase.body')}
                            </p>
                            <p className="showcase-hint">
                                {t('collab.showcase.hint')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Editorial Image Grid */}
                    <div className="showcase-gallery">
                        <motion.figure
                            className="gallery-figure gallery-figure--choir"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="figure-atmosphere" />
                            <OptimizedImage
                                src="/collab/salter/choir_salter.svg"
                                alt="Genesi Nova Choir performing at Holyween"
                            />
                        </motion.figure>


                        <motion.figure
                            className="gallery-figure gallery-figure--audience"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            <div className="figure-atmosphere" />
                            <OptimizedImage
                                src="/collab/salter/audience_salter.svg"
                                alt="Audience at Holyween"
                            />
                        </motion.figure>
                    </div>


                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                COLLABORATION CTA / FORM
            ═══════════════════════════════════════════════════════════════ */}
            <section className="collab-cta" id="collab-form">
                <div className="cta-container">

                    <motion.div
                        className="cta-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="cta-title">{t('collab.form.title')}</h2>
                        <p className="cta-subtitle">
                            {t('collab.form.subtitle')}
                        </p>
                    </motion.div>

                    {status === 'success' ? (
                        // Success Message
                        <motion.div
                            className="success-message"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="success-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </motion.div>
                            <motion.h3
                                className="success-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {t('collab.form.success.title')}
                            </motion.h3>
                            <motion.p
                                className="success-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <Trans i18nKey="collab.form.success.message" components={{ br: <br /> }} />
                            </motion.p>
                        </motion.div>
                    ) : (
                        // Form
                        <motion.form
                            className="collab-form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Option Selection */}
                            <div className="form-options">
                                {collaborationOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        className={`form-option ${selectedOption === option.id ? 'active' : ''}`}
                                        onClick={() => setSelectedOption(option.id)}
                                    >
                                        <span className="option-indicator" />
                                        <span className="option-label">{option.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Form Fields - Appear after selection */}
                            <motion.div
                                className="form-fields"
                                initial={false}
                                animate={{
                                    opacity: selectedOption ? 1 : 0.3,
                                    y: selectedOption ? 0 : 10
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="collab-name">{t('collab.form.labels.name')}</label>
                                        <input
                                            id="collab-name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!selectedOption || status === 'submitting'}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="collab-email">{t('collab.form.labels.email')}</label>
                                        <input
                                            id="collab-email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!selectedOption || status === 'submitting'}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="collab-message">{t('collab.form.labels.message')}</label>
                                    <textarea
                                        id="collab-message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder={
                                            selectedOption
                                                ? collaborationOptions.find(o => o.id === selectedOption)?.placeholder
                                                : t('collab.form.placeholders.default')
                                        }
                                        disabled={!selectedOption || status === 'submitting'}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={!selectedOption || status === 'submitting'}
                                >
                                    <span>
                                        {status === 'submitting'
                                            ? t('collab.form.sending') || 'Sending...'
                                            : t('collab.form.submit')}
                                    </span>
                                    {status !== 'submitting' && (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                            </motion.div>
                        </motion.form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Collab;
