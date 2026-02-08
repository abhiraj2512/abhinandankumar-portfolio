import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { content } from '../data/content';
import { useTypewriter } from '../hooks/useTypewriter';
import '../styles/sections/Hero.scss';

const Hero: React.FC = () => {
    const { hero } = content;

    // Split name into array of characters
    const nameLetters = Array.from(hero.name);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
        }),
    };

    const childVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    } as const;

    // Typewriter effect for roles
    const [text] = useTypewriter({
        words: ["Frontend Developer", "Freelancer", "Full Stack Developer"],
        loop: true,
        typeSpeed: 100,
        deleteSpeed: 50,
        delaySpeed: 1500,
    });

    return (
        <section id="hero" className="hero">
            <div className="hero__content">
                <motion.span
                    className="hero__greeting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {hero.title}
                </motion.span>

                <motion.h1
                    className="hero__name"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {nameLetters.map((letter, index) => (
                        <motion.span variants={childVariants} key={index}>
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.h2
                    className="hero__subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <span>{text}</span>
                    <span className="hero__cursor">|</span>
                </motion.h2>

                <motion.p
                    className="hero__desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                >
                    {hero.description}
                </motion.p>

                <motion.div
                    className="hero__cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 }}
                >
                    <Button href="#projects" variant="outline" className="hero__button">
                        {hero.cta}
                    </Button>
                    <Button
                        href={hero.resume}
                        variant="primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero__button"
                    >
                        Resume
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
