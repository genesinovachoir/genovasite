import React from 'react';
import './StarfieldBackground.css';

const StarfieldBackground = () => {
    return (
        <div className="starfield">
            <div className="starfield-layer starfield-layer--1" />
            <div className="starfield-layer starfield-layer--2" />
            <div className="starfield-layer starfield-layer--3" />
        </div>
    );
};

export default StarfieldBackground;
