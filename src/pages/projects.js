import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProjectsPage = ({
    data: {
      allMarkdownRemark: { edges },
    },
  }) => (
  <Layout>
    <SEO title="Projects" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
    {
        <ul className="posts">
            {edges.map(edge => {
                return (
                    <li className="post" key={edge.node.id}>
                        <h2>
                            <Link 
                                className="post-link"
                                to={edge.node.frontmatter.path}
                            >
                                {edge.node.frontmatter.title}
                            </Link>
                        </h2>
                        <h3>{edge.node.frontmatter.date} - {edge.node.timeToRead} min read</h3>
                    </li>
                )
            })}
        </ul>
    }
  </Layout>
)

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
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
          timeToRead
        }
      }
    }
  }
`