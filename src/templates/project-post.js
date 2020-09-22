import React from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, tags },
      html,
    },
  },
}) => (
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

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
      }
    }
  }
`
