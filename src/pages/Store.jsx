import React from 'react';
import ShopSection from '../components/ShopSection';

const Store = () => {
    return (
        <main className="store-page" style={{
            paddingTop: '200px', /* Clear the fixed header */
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ShopSection />
        </main>
    );
};

export default Store;
