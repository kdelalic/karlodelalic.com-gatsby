import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  
  return (
    <Layout title={frontmatter.title}>
      <SEO
        title={frontmatter.title}
        keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`, ...frontmatter.tags]}
      />
      <div className="post">
        <h3 className="post__date">{frontmatter.date}</h3>
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
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`