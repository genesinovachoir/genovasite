import React from 'react';
import ScrollReveal from './ScrollReveal';

const AboutSection = () => {
    return (
        <section id="about" className="about-section section" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg-light)' }}>
            <div className="container">
                <ScrollReveal>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: 'inherit', marginBottom: 'var(--spacing-md)', fontFamily: 'var(--font-heading)' }}>Genesi Nova Nedir?</h2>

                        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', lineHeight: '1.8', opacity: '0.9' }}>
                            Genesi Nova Korosu is a contemporary polyphonic ensemble dedicated to exploring the boundaries of vocal music.
                            Founded with a vision to blend traditional choral techniques with modern innovation, we bring a fresh
                            perspective to the choral world.
                        </p>
                        <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-md)', lineHeight: '1.8', opacity: '0.9' }}>
                            Our mission is to create immersive musical experiences that resonate with audiences of all generations,
                            bridging cultures and genres through the universal language of harmony.
                        </p>

                        <a href="#" className="btn" style={{
                            borderColor: 'var(--color-bg-light)',
                            color: 'var(--color-bg-light)',
                            marginTop: '2rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-bg-light)';
                                e.currentTarget.style.color = 'var(--color-primary)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--color-bg-light)';
                            }}
                        >
                            Learn More About Us
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default AboutSection;
