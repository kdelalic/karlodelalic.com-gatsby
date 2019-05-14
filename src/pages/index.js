import React from "react"

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
  </Layout>
)

export default IndexPage
