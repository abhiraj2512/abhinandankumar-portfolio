import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/Button.scss';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children: React.ReactNode;
    href?: string;
    variant?: 'primary' | 'outline';
    className?: string;
    target?: string;
    rel?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, variant = 'primary', className = '', ...rest }) => {
    const Component = href ? motion.a : motion.button;
    const props = href ? { href, ...rest } : { ...rest };

    return (
        // @ts-ignore
        <Component
            className={`btn btn--${variant} ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
