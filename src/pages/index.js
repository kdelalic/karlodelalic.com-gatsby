import React from "react"
import { Link } from "gatsby"
import { FaGithub, FaPencilAlt, FaTwitter } from "react-icons/fa";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
    <div style={{ maxWidth: `175px`, margin: `0 auto 1.45rem auto` }}>
      <Image />
    </div>
    <h1 style={{color: `#363636`}}>Karlo Delalic</h1>
    <h2 style={{marginTop: `5px`}}>Fullstack Software Engineer</h2>
    <p style={{marginTop: `25px`}}>I like to make cool things.</p>
    <div className="links">
        <Link className="link-button" to="/blog">
            <FaPencilAlt className="link-button-icon"/> Writings
        </Link>
        <a className="link-button" href="https://github.com/kdelalic" target="_blank" rel="noopener noreferrer">
            <FaGithub className="link-button-icon"/> Github
        </a>
        <a className="link-button" href="https://twitter.com/karlodelalic" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="link-button-icon"/> Twitter
        </a>
    </div>
  </Layout>
)

export default IndexPage
