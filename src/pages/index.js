import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FaGithub, FaPencilAlt, FaTwitter } from "react-icons/fa"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import Seo from "../components/seo"

import "./index.scss"

const IndexPage = ({
  data
}) => (
  <Layout centered>
    <GatsbyImage className="profile-image" image={getImage(data.profileImage)} alt="profile image" loading="eager" />
    <h1 className="fullname">Karlo Delalic</h1>
    <h2 className="occupation">Software Engineer</h2>
    <h3 className="description">I like to make cool things.</h3>
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
  </Layout>
)

export const query = graphql`{
  profileImage: file(relativePath: {eq: "profile.png"}) {
    childImageSharp {
      gatsbyImageData(width: 175, layout: CONSTRAINED, placeholder: NONE)
    }
  },
  blogPosts: allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
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
`

export default IndexPage

export const Head = () => (
  <Seo
    title="Home"
    keywords={[...Constants.tags, "home page", "latest blog post"]}
  />
)
