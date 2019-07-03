import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./404.scss"

export default () => (
  <Layout title="404" centered>
    <SEO title="404: Not found" />
    <h2 className="page-not-found">Page not found</h2>
  </Layout>
)
