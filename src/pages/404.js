import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./404.scss"

const NotFoundPage = () => (
  <Layout title="404" centered>
    <Seo title="404: Not found" />
    <h2 className="page-not-found">Page not found</h2>
  </Layout>
)

export default NotFoundPage
