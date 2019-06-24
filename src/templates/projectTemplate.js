import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Template = () => {

  const { data } = useStaticQuery(
    graphql`
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
  );

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, tags } = frontmatter;

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

export default Template
