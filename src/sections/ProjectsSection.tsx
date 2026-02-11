import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { content } from '../data/content';
import '../styles/sections/Projects.scss';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects: React.FC = () => {
    const { projects } = content;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <SectionWrapper id="projects" className="projects">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                03. Some Things I've Built
            </motion.h2>

            <motion.div
                className="projects__grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map((project: any, i: number) => {
                    const isComingSoon = project.comingSoon;
                    const isFeatured = i === 0;

                    return (
                        <motion.div
                            key={i}
                            className={`project-card ${isFeatured ? 'featured-card' : ''} ${isComingSoon ? 'project-card--disabled' : ''}`}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="project-card__image-container">
                                <img src={project.image} alt={project.title} className="project-image" />
                                <div className="project-overlay"></div>
                            </div>

                            <div className="project-card__content">
                                <div className="project-header">
                                    <h3 className="project-title">{project.title}</h3>
                                    {isComingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                                </div>

                                <ul className="project-tech-list">
                                    {project.tech.map((tech: string, j: number) => (
                                        <li key={j}>{tech}</li>
                                    ))}
                                </ul>

                                <div className="project-actions">
                                    {project.github && !isComingSoon && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-link"
                                            aria-label="GitHub Link"
                                        >
                                            <FaGithub />
                                        </a>
                                    )}
                                    {(project.external || project.disableLiveDemo) && !isComingSoon && (
                                        <a
                                            href={project.disableLiveDemo ? undefined : project.external}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`icon-link ${project.disableLiveDemo ? 'disabled' : ''}`}
                                            aria-label="External Link"
                                            title={project.disableLiveDemo ? "Coming soon" : "Live Demo"}
                                        >
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </SectionWrapper>
    );
};

export default Projects;
