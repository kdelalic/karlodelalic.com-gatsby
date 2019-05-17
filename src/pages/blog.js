import React from "react"
import { graphql } from "gatsby"

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
        edges.map(edge => {
            return (<div key={edge.node.id}>{edge.node.frontmatter.title}</div>)
        })
    }
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {frontmatter: {posttype: {eq: "blog"}}}
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
        }
      }
    }
  }
`