import React from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data: {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        tags
      }
    }
  },
}) {
  return (
    <Layout title={title}>
      <SEO title={title} keywords={[...Constants.tags, ...tags]} />
      <div className="post">
        <div
          className="post__content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        tags
      }
    }
  }
`