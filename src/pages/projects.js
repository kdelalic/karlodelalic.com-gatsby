import React from "react"
import { Link, graphql } from "gatsby"
import { FaGithub } from "react-icons/fa"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "./projects.scss"

export default ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    projectLogos: { edges: projectLogoEdges },
    techLogos: { edges: techLogoEdges },
  },
}) => {
  const projectLogos = {}

  projectLogoEdges.forEach(edge => {
    projectLogos["/" + edge.node.relativeDirectory] = edge.node.publicURL
  })

  const techLogos = {}

  techLogoEdges.forEach(edge => {
    techLogos[edge.node.name] = edge.node.publicURL
  })

  return (
    <Layout title="Projects">
      <SEO
        title="Projects"
        keywords={[...Constants.tags, "projects", "technology"]}
      />
      <div className="projects">
        {postEdges.map(edge => (
          <div className="project" key={edge.node.id}>
            <div className="project__content paper">
              <h2 className="project__title">{edge.node.frontmatter.title}</h2>
              <div className="project__body">
                <p className="project__body__description">
                  {edge.node.frontmatter.description}
                </p>
                <div className="project__body__tech-logos">
                  {edge.node.frontmatter.tech.map(tech => {
                    return (
                      <div
                        key={tech}
                        className="project__body__tech-logos__logo"
                      >
                        <span className="tooltip">{tech}</span>
                        <img
                          alt={`${tech} Logo`}
                          src={techLogos[tech.toLowerCase()]}
                        />
                      </div>
                    )
                  })}
                </div>
                <div className="project__body__buttons">
                  {edge.node.frontmatter.github && (
                    <a
                      className="link-button"
                      href={edge.node.frontmatter.github}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <FaGithub />
                      Source
                    </a>
                  )}
                  {edge.node.frontmatter.demo && (
                    <a
                      className="link-button secondary"
                      href={edge.node.frontmatter.demo}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      Demo
                    </a>
                  )}
                  {edge.node.html && (
                    <Link
                      to={edge.node.fields.slug}
                      className="link-button secondary"
                    >
                      Read more
                    </Link>
                  )}
                </div>
              </div>
              <img
                className="project__logo"
                alt="Project logo"
                src={projectLogos[edge.node.fields.slug]}
              />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            description
            demo
            github
            tech
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
    projectLogos: allFile(
      filter: {
        absolutePath: { regex: "/projects/" }
        extension: { regex: "/svg/" }
      }
    ) {
      edges {
        node {
          publicURL
          relativeDirectory
        }
      }
    }
    techLogos: allFile(
      filter: {
        absolutePath: { regex: "/tech-logos/" }
        extension: { regex: "/svg/" }
      }
    ) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
