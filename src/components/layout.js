/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import Header from "./header"
import Footer from "./footer"
import "./layout.scss"

const Layout = ({ children }) => (
    <>
    <Header/>
    <div
        className="content"
    >
        <main>{children}</main>
    </div>
    <Footer/>
    </>
)


export default Layout
