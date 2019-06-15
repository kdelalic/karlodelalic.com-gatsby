import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./projects.scss"

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    projectLogos: { edges: projectLogoEdges },
    techLogos: { edges: techLogoEdges }
  },
}) => {

  const projectLogos = {};

  projectLogoEdges.forEach(edge => {
    projectLogos["/" + edge.node.relativeDirectory] = edge.node.publicURL;
  })

  const techLogos = {};

  techLogoEdges.forEach(edge => {
    techLogos[edge.node.name] = edge.node.publicURL;
  })

  return (
    <Layout title="Projects">
      <SEO title="Projects" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
      <div className="projects">
        {postEdges.map(edge => (
          <div className="project" key={edge.node.id}>
            <div className="project__content paper">
              <h2 className="project__title">
                {edge.node.frontmatter.title}
              </h2>
              <div className="project__body">
                <p className="project__body__description">{edge.node.frontmatter.description}</p>
                <div className="project__body__tech-logos">
                  {edge.node.frontmatter.tech.map(tech => {
                    return (
                      <div key={tech} className="project__body__tech-logos__logo">
                        <span className="tooltip">{tech}</span>
                        <img alt={`${tech} Logo`} src={techLogos[tech.toLowerCase()]} />
                      </div>
                    )
                  })}
                </div>
                <div className="project__body__buttons">
                  <Link to={edge.node.frontmatter.path} className="link-button">
                    Read more
                    </Link>
                  <a className="link-button secondary" href={edge.node.frontmatter.demo} target="_blank" rel="noopener noreferrer">
                    Demo
                    </a>
                </div>
              </div>
              <img className="project__logo" alt="Project logo" src={projectLogos[edge.node.frontmatter.path]} />
            </div>
          </div>
        )
        )}
      </div>
    </Layout>
  )
}

export default ProjectsPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {type: {eq: "project"}}}) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            description
            demo
            github
            tech
          }
          timeToRead
        }
      }
    }
    projectLogos: allFile(filter: {absolutePath: {regex: "/projects/"}, extension: {regex: "/svg/"}}) {
      edges {
        node {
          publicURL
          relativeDirectory
        }
      }
    }
    techLogos: allFile(filter: {absolutePath: {regex: "/tech-logos/"}, extension: {regex: "/svg/"}}) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`