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
            date(formatString: "MMMM D, YYYY")
            author
            path
            title
            tags
          }
        }
      }
    `
  );

  const { markdownRemark } = data;
  const { html, frontmatter } = markdownRemark;
  const { title, tags, author, date } = frontmatter;

  return (
    <Layout title={title}>
      <SEO
        title={title}
        keywords={[...Constants.tags, ...tags]}
      />
      <div className="post">
        <h3 className="post__date">{author}<span className="dot-divider"></span>{date}</h3>
        <div
          className="post__content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export default Template
