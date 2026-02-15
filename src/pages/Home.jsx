import React from 'react';
import HeroSection from '../components/HeroSection';
import ImpactCTA from '../components/ImpactCTA';
import FeaturedPerformance from '../components/FeaturedPerformance';
import EventCalendar from '../components/EventCalendar';
import BlogUpdates from '../components/BlogUpdates';

const Home = () => {
    return (
        <main>
            <HeroSection />

            {/* Unified Gradient Wrapper for CTA */}
            <div style={{
                background: 'linear-gradient(to bottom, rgba(5, 6, 10, 0.8) 0%, rgba(20, 25, 45, 0.2) 100%)',
                width: '100%'
            }}>
                <ImpactCTA />
            </div>

            <FeaturedPerformance />
            <EventCalendar />
            <BlogUpdates />
        </main>
    );
};

export default Home;

