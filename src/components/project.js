import React from "react"
import { FaGithub } from "react-icons/fa"

import "./project.scss"

const Project = ({
  description,
  github,
  technologies,
  title,
  demo,
  techLogos,
  projectLogo,
}) => {
  return (
    <div className="project">
      <div className="project__content paper">
        <h2 className="project__title">{title}</h2>
        <div className="project__body">
          <p className="project__body__description">{description}</p>
          <div className="project__body__tech-logos">
            {technologies.map(technology => {
              return (
                <div
                  key={technology}
                  className="project__body__tech-logos__logo"
                >
                  <span className="tooltip">{technology}</span>
                  <img
                    alt={`${technology} Logo`}
                    src={techLogos[technology.toLowerCase()]}
                  />
                </div>
              )
            })}
          </div>
          <div className="project__body__buttons">
            {github && (
              <a
                className="link-button"
                href={github}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <FaGithub />
                Source
              </a>
            )}
            {demo && (
              <a
                className="link-button secondary"
                href={demo}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Demo
              </a>
            )}
          </div>
        </div>
        <img className="project__logo" alt="Project logo" src={projectLogo} />
      </div>
    </div>
  )
}

export default Project