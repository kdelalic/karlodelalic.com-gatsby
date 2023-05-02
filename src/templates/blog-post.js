import React from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPost = ({
  data: {
    markdownRemark: {
      frontmatter: { author, date, title },
      html,
    },
  },
}) => (
  <Layout title={title}>
    <div className="post">
      <h3 className="post__date">
        {author}
        <span className="dot-divider"></span>
        {date}
      </h3>
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
        date(formatString: "MMMM D, YYYY")
        author
        title
        tags
      }
    }
  }
`

export default BlogPost

export const Head = ({
  data: {
    markdownRemark: {
      frontmatter: { tags, title },
    },
  },
}) => <Seo title={title} keywords={[...Constants.tags, ...tags]} />
