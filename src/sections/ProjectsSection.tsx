import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { content } from '../data/content';
import { FaFolder } from 'react-icons/fa';
import Button from '../components/Button';
import '../styles/sections/Projects.scss';

// Mock projects if content doesn't have them yet
// const projectsData = ... (removed)

const Projects: React.FC = () => {
    const { projects } = content;
    // Use content projects directly
    const projectList = projects;

    return (
        <SectionWrapper id="projects" className="projects">
            <h2 className="section-title">03. Some Things I've Built</h2>
            <div className="projects__grid">
                {projectList.map((project: any, i: number) => {
                    const isComingSoon = project.comingSoon;
                    // Title link: prioritize external, then github, else null
                    const titleLink = project.external || project.github;

                    return (
                        <div key={i} className={`project-card ${isComingSoon ? 'project-card--disabled' : ''}`}>
                            <div className="project-card__header">
                                <div className="folder">
                                    <FaFolder />
                                </div>
                                <div className="links">
                                    {isComingSoon && <span className="coming-soon-label">Coming Soon</span>}
                                </div>
                            </div>

                            <h3 className="project-card__title">
                                {titleLink && !isComingSoon ? (
                                    <a href={titleLink} target="_blank" rel="noopener noreferrer">{project.title}</a>
                                ) : (
                                    project.title
                                )}
                            </h3>

                            <div className="project-card__desc">
                                <p>{project.description}</p>
                            </div>
                            <ul className="project-card__tech">
                                {project.tech.map((tech: string, j: number) => (
                                    <li key={j}>{tech}</li>
                                ))}
                            </ul>

                            <div className="project-card__actions">
                                {(project.external || project.disableLiveDemo) && !isComingSoon && (
                                    <div className={`action-wrapper ${project.disableLiveDemo ? 'disabled-wrapper' : ''}`}
                                        data-tooltip={project.disableLiveDemo ? "Coming live soon" : undefined}
                                    >
                                        <Button
                                            href={project.disableLiveDemo ? undefined : project.external}
                                            variant="primary"
                                            target={project.disableLiveDemo ? undefined : "_blank"}
                                            rel={project.disableLiveDemo ? undefined : "noopener noreferrer"}
                                            className={`project-btn ${project.disableLiveDemo ? 'btn--disabled' : ''}`}
                                            disabled={project.disableLiveDemo}
                                        >
                                            Live Demo
                                        </Button>
                                    </div>
                                )}
                                {project.github && !isComingSoon && (
                                    <Button
                                        href={project.github}
                                        variant="outline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-btn"
                                    >
                                        GitHub
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export default Projects;
