import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = () => (
  <Layout>
    <SEO title="Blog" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`, `blog`]} />
    <h1>Hi from the blog page</h1>
    <p>Welcome to blog page</p>
  </Layout>
)

export default BlogPage
