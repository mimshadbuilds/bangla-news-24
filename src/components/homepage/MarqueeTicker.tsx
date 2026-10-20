'use client';

import { useEffect, useState, type ReactNode } from 'react';
import MarqueeText from 'react-marquee-text';

const DESKTOP_MAX_WIDTH = 1280;
const LABEL_WIDTH = 72;
const WRAPPER_PADDING = 32;
const PIXELS_PER_SECOND = 60;

const getDuration = () => {
    const availableWidth = Math.min(window.innerWidth, DESKTOP_MAX_WIDTH) - LABEL_WIDTH - WRAPPER_PADDING;
    return Math.max(20, Math.round(availableWidth / PIXELS_PER_SECOND));
};

const MarqueeTicker = ({ children }: { children: ReactNode }) => {
    const [duration, setDuration] = useState(80);

    useEffect(() => {
        const updateDuration = () => setDuration(getDuration());

        updateDuration();
        window.addEventListener('resize', updateDuration);

        return () => window.removeEventListener('resize', updateDuration);
    }, []);

    return (
        <MarqueeText direction="right" duration={duration} pauseOnHover={true}>
            {children}
        </MarqueeText>
    );
};

export default MarqueeTicker;
