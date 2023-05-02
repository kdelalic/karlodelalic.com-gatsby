import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./404.scss"

const NotFoundPage = () => (
  <Layout title="404" centered>
    <h2 className="page-not-found">Page not found</h2>
  </Layout>
)

export default NotFoundPage

export const Head = () => (
  <Seo title="404: Not found" />
)
