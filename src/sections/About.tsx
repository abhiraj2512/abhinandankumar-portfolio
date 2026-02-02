import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { content } from '../data/content';
import '../styles/sections/About.scss';
import profileImg from '../images/profile.jpg';

const About: React.FC = () => {
    const { about, skills } = content;

    return (
        <SectionWrapper id="about" className="about">
            <h2 className="section-title">01. {about.title}</h2>
            <div className="about__content">
                <div className="about__text">
                    <p>{about.text}</p>
                    <p>Here are a few technologies I've been working with recently:</p>
                    <ul className="about__skills-list">
                        {skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="about__img">
                    <div className="img-wrapper">
                        {/* Use a placeholder from unsplash or generate one if needed, but for now a colored div or placeholder */}
                        {/* <div className="placeholder-img" /> */}
                        <img src={profileImg} alt="Profile" />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default About;
