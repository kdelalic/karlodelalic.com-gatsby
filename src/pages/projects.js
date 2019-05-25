import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    previewImages: { edges: previewImageEdges }
  },
}) => {

  const previewImages = {};

  previewImageEdges.forEach(edge => {
    previewImages["/" + edge.node.relativeDirectory] = edge.node.childImageSharp.fluid;
  })

  return (
    <Layout title="Projects">
      <SEO title="Projects" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
      {
        <div className="posts">
          {postEdges.map(edge => (
            <div className="post box" key={edge.node.id}>
              <Link
                className="post-link"
                to={edge.node.frontmatter.path}
              >
                <h2>{edge.node.frontmatter.title}</h2>
                <h3>{edge.node.timeToRead} min read</h3>
                <Img className="preview-image" fluid={previewImages[edge.node.frontmatter.path]} />
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
          }
          timeToRead
        }
      }
    }
    previewImages: allFile(
        filter: { 
            absolutePath: {
            regex: "/projects/"
          },
          extension:{
            regex:"/png/"
          }
        }
      ) {
        edges {
          node {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
              relativeDirectory
          }
        }
      }
  }
`