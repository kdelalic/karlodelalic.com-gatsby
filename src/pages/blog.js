import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = ({
    data: {
      allMarkdownRemark: { edges },
    },
  }) => (
  <Layout>
    <SEO title="Blog" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`, `blog`]} />
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
                        <p>{edge.node.excerpt}</p>
                    </li>
                )
            })}
        </ul>
    }
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {frontmatter: {type: {eq: "blog"}}}
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