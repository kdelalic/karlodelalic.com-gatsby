import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./projects.scss"

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    projectIcons: { edges: projectIconEdges }
  },
}) => {

  const projectIcons = {};

  projectIconEdges.forEach(edge => {
    projectIcons["/" + edge.node.relativeDirectory] = edge.node.publicURL;
  })

  return (
    <Layout title="Projects">
      <SEO title="Projects" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
      {
        <div className="projects">
          {postEdges.map(edge => (
            <div className="post project" key={edge.node.id}>
              <div className="project__content paper">
                <h2 className="project__title">
                  {edge.node.frontmatter.title}
                </h2>
                <div className="project__body">
                  <p className="project__body__description">{edge.node.frontmatter.description}</p>
                </div>
                <div className="project__body__buttons">
                  <Link to={edge.node.frontmatter.path} className="link-button">
                    Read more
                  </Link>
                  <a className="link-button secondary" href={edge.node.frontmatter.demo} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                </div>
                <img className="project__logo" alt="Project logo" src={projectIcons[edge.node.frontmatter.path]} />
              </div>
            </div>
          )
          )}
        </div>
      }
    </Layout>
  )
}

export default ProjectsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {frontmatter: {type: {eq: "project"}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            description
            demo
          }
          timeToRead
        }
      }
    }
    projectIcons: allFile(
        filter: { 
            absolutePath: {
            regex: "/projects/"
          },
          extension:{
            regex:"/svg/"
          }
        }
      ) {
        edges {
          node {
              publicURL
              relativeDirectory
          }
        }
      }
  }
`