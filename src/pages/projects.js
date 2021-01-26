import React from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Project from "../components/project"

import "./projects.scss"

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    projectLogos: { edges: projectLogoEdges },
    techLogos: { edges: techLogoEdges },
  },
}) => {
  const projectLogos = {}

  projectLogoEdges.forEach(({ node }) => {
    projectLogos["/" + node.relativeDirectory] = node.publicURL
  })

  const techLogos = {}

  techLogoEdges.forEach(({ node }) => {
    techLogos[node.name] = node.publicURL
  })

  return (
    <Layout title="Projects">
      <SEO
        title="Projects"
        keywords={[...Constants.tags, "projects", "technology"]}
      />
      <div className="projects">
        {postEdges.map(({ node }) => {
          const {
            id,
            description,
            github,
            technologies,
            title,
            demo,
          } = node.frontmatter
          const { slug } = node.fields
          return (
            <Project
              key={id}
              description={description}
              github={github}
              technologies={technologies}
              title={title}
              demo={demo}
              techLogos={techLogos}
              projectLogo={projectLogos[slug]}
            />
          )
        })}
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
            technologies
            tags
          }
          fields {
            slug
          }
        }
      }
    }
    projectLogos: allFile(
      filter: {
        absolutePath: { regex: "/projects/" }
        base: { eq: "logo.svg" }
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

export default ProjectsPage
