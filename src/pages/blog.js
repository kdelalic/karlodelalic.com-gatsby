import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./blog.scss"

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
    <Layout title="Blog">
      <SEO title="Blog" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`, `blog`]} />
      {
        <div className="blog">
          {edges.map(edge => {
            return (
              <div className="blog__post" key={edge.node.id}>
                <h2 className="blog__post__title">
                  <Link
                    className="blog__post__link"
                    to={edge.node.frontmatter.path}
                  >
                    {edge.node.frontmatter.title}
                  </Link>
                </h2>
                <h3 className="read-time">{edge.node.frontmatter.date} — {edge.node.timeToRead} min read</h3>
                <p>{edge.node.excerpt}</p>
              </div>
            )
          })}
        </div>
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