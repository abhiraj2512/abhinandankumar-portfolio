import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { content } from '../data/content';
import '../styles/sections/Experience.scss';

const Experience: React.FC = () => {
    const { experience } = content;

    return (
        <SectionWrapper id="experience" className="experience">
            <h2 className="section-title">02. Where I've Worked</h2>
            <div className="experience__container">
                {experience.map((job: any, i) => (
                    <div key={i} className="experience__item">
                        <div className="experience__header">
                            <h3 className="experience__role">{job.role}</h3>
                            <span className="experience__company">@ {job.company}</span>
                        </div>
                        {job.duration && <p className="experience__duration">{job.duration}</p>}
                        <ul className="experience__list">
                            {job.description.map((desc: string, j: number) => (
                                <li key={j}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Experience;
