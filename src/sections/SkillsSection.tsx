import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import '../styles/sections/Skills.scss';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaSass, FaGitAlt, FaGitlab, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiAntdesign } from 'react-icons/si';

const skillsRow1 = [
    { name: 'JavaScript (ES6+)', icon: <SiJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Sass', icon: <FaSass /> },
    { name: 'Ant Design', icon: <SiAntdesign /> },
];

const skillsRow2 = [
    { name: 'Framer Motion', icon: <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Fr</span> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'GitLab', icon: <FaGitlab /> },
    { name: 'Figma', icon: <FaFigma /> },
];

// Duplicate items to create seamless loop
const MarqueeRow = ({ items, direction = 'left', speed = 25 }: { items: typeof skillsRow1, direction?: 'left' | 'right', speed?: number }) => {
    return (
        <div className={`marquee-row ${direction}`}>
            <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
                {/* Render items multiple times to ensure full width coverage + loop buffer */}
                {[...items, ...items, ...items, ...items].map((skill, index) => (
                    <motion.div
                        key={`${skill.name}-${index}`}
                        className="skill-card"
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(100, 255, 218, 0.1)",
                            borderColor: "rgba(100, 255, 218, 0.5)"
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="skill-icon">{skill.icon}</div>
                        <p>{skill.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const SkillsSection: React.FC = () => {
    return (
        <SectionWrapper id="skills" className="skills">
            <h2 className="section-title">03. My Tech Stack</h2>

            <div className="skills__container">
                <MarqueeRow items={skillsRow1} direction="left" speed={30} />
                <MarqueeRow items={skillsRow2} direction="right" speed={35} />
            </div>
        </SectionWrapper>
    );
};

export default SkillsSection;
