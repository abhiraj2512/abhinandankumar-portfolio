import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    className?: string;
}

const SECTION_VARIANTS = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.645, 0.045, 0.355, 1.000] // cubic-bezier for smooth feel
        }
    }
} as const;

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
    return (
        <motion.section
            id={id}
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={SECTION_VARIANTS}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
