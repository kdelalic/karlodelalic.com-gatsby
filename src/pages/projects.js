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
    techLogos: { edges: techLogoEdges },
  },
}) => {
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
            description,
            github,
            technologies,
            title,
            demo,
            projectLogo,
          } = node.frontmatter
          return (
            <Project
              key={node.id}
              description={description}
              github={github}
              technologies={technologies}
              title={title}
              demo={demo}
              techLogos={techLogos}
              projectLogo={projectLogo.publicURL}
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
            projectLogo {
              publicURL
            }
          }
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
