/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import Header from "./header"
import "./layout.scss"

const Layout = (props) => (
  <React.Fragment>
    <Header />
    <div className={`content${props.centered ? " centered" : ""}`}>
      {props.title && <h1 className="title">{props.title}</h1>}
      <main>{props.children}</main>
    </div>
  </React.Fragment>
)


export default Layout
