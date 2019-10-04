import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { FaGithub, FaPencilAlt, FaTwitter } from "react-icons/fa"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "./index.scss"

export default () => (
  <Layout centered>
    <SEO
      title="Home"
      keywords={[...Constants.tags, "home page", "latest blog post"]}
    />
    <div style={{ maxWidth: `175px`, margin: `0 auto 1.45rem auto` }}>
      <Image />
    </div>
    <h1 className="fullname">Karlo Delalic</h1>
    <h2 className="occupation">Full Stack Software Engineer</h2>
    <h4 className="description">I like to make cool things.</h4>
    <div className="social-buttons">
      <Link className="link-button ghost" to="/blog">
        <FaPencilAlt /> Writings
      </Link>
      <a
        className="link-button ghost"
        href="https://github.com/kdelalic"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <FaGithub /> Github
      </a>
      <a
        className="link-button ghost"
        href="https://twitter.com/karlodelalic"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter /> Twitter
      </a>
    </div>
    <StaticQuery
      query={graphql`
        {
          blogPosts: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { type: { eq: "blog" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 200)
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div className="latest-post">
          <h3 className="latest-post__title">
            <Link
              className="latest-post__title__link"
              to={data.blogPosts.edges[0].node.fields.slug}
            >
              {data.blogPosts.edges[0].node.frontmatter.title}
            </Link>
            <span className="tag">Latest writing</span>
          </h3>
          <p className="latest-post__excerpt">
            {data.blogPosts.edges[0].node.excerpt}
          </p>
        </div>
      )}
    />
  </Layout>
)
