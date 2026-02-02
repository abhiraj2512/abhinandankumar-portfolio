import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import '../styles/sections/Skills.scss';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaSass, FaGitAlt, FaGitlab, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiAntdesign } from 'react-icons/si';

const skillsData = {
    "Frontend Core": [
        { name: 'JavaScript (ES6+)', icon: <SiJavascript /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
    ],
    "Frameworks & UI": [
        { name: 'React', icon: <FaReact /> },
        { name: 'Sass', icon: <FaSass /> },
        { name: 'Ant Design', icon: <SiAntdesign /> },
        { name: 'Framer Motion', icon: <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Fr</span> }, // Using text as sub for icon or could use lightning icon
    ],
    "Tools & Platforms": [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'GitLab', icon: <FaGitlab /> },
        { name: 'Node.js', icon: <FaNodeJs /> },
    ],
    "Design": [
        { name: 'Figma', icon: <FaFigma /> },
    ]
};

const SkillsSection: React.FC = () => {
    return (
        <SectionWrapper id="skills" className="skills">
            <h2 className="section-title">03. My Tech Stack</h2>

            <div className="skills__container">
                {Object.entries(skillsData).map(([category, skills]) => (
                    <div key={category} className="skills__category">
                        <h3 className="skills__category-title">{category}</h3>
                        <div className="skills__grid">
                            {skills.map(skill => (
                                <div key={skill.name} className="skill-card">
                                    <div className="skill-icon">{skill.icon}</div>
                                    <p>{skill.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default SkillsSection;
