import React from "react"
import { Link } from "gatsby"
import { FaGithub, FaPencilAlt, FaTwitter } from "react-icons/fa";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "./index.scss"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
    <div style={{ maxWidth: `175px`, margin: `0 auto 1.45rem auto` }}>
      <Image />
    </div>
    <h1 className="fullname">Karlo Delalic</h1>
    <h2 className="occupation">Fullstack Software Engineer</h2>
    <p className="description">I like to make cool things.</p>
    <div className="social-buttons">
      <Link className="link-button ghost" to="/blog">
        <FaPencilAlt className="link-button__icon" /> Writings
      </Link>
      <a className="link-button ghost" href="https://github.com/kdelalic" target="_blank" rel="noopener noreferrer">
        <FaGithub className="link-button__icon" /> Github
      </a>
      <a className="link-button ghost" href="https://twitter.com/karlodelalic" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="link-button__icon" /> Twitter
      </a>
    </div>
  </Layout>
)

export default IndexPage
