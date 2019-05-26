import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
        <div className="posts">
          {postEdges.map(edge => (
            <div className="post project" key={edge.node.id}>
              <Link
                className="post__link"
                to={edge.node.frontmatter.path}
              >
                <div className="project__content paper">
                  <div className="project__head">
                    <h2>{edge.node.frontmatter.title}</h2>
                    <h3> — {edge.node.timeToRead} min read</h3>
                  </div>
                  <div className="project__body">
                    <p>{edge.node.frontmatter.description}</p>
                  </div>
                  <div className="project__body__buttons">

                  </div>
                  <img className="project__icon" alt="Project icon" src={projectIcons[edge.node.frontmatter.path]} />
                </div>
              </Link>
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