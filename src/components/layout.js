/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => (
    <React.Fragment>
        <Header/>
        <div
            className="content"
        >
            <main>{children}</main>
        </div>
    </React.Fragment>
)


export default Layout
