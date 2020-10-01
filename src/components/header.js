import React, { useState } from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import IconButton from "@material-ui/core/IconButton"
import { FaSun, FaMoon } from "react-icons/fa"

import Logo from "../assets/images/logo.svg"

import useDarkMode from "../hooks/src/darkmode"

import "./header.scss"

const Header = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false)
  const [isDarkMode, setDarkMode] = useDarkMode("dark")

  return (
    <StaticQuery
      query={graphql`
        {
          allFile(
            filter: {
              sourceInstanceName: { eq: "pages" }
              extension: { eq: "js" }
            }
          ) {
            edges {
              node {
                name
                id
              }
            }
          }
        }
      `}
      render={data => (
        <header>
          <div className="brand">
            <Link to={"/"} aria-label="Brand Logo" className="brand__logo">
              <Logo />
            </Link>
            <span className="brand__name">Karlo Delalic</span>
          </div>
          <div
            onClick={() => setNavbarOpen(!isNavbarOpen)}
            onKeyDown={() => setNavbarOpen(!isNavbarOpen)}
            className={`navbar-burger${isNavbarOpen ? " open" : ""}`}
            role="button"
            tabIndex="0"
            aria-label="navbar mobile button"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            onClick={() => setNavbarOpen(false)}
            onKeyDown={() => setNavbarOpen(false)}
            className={`navbar${isNavbarOpen ? " open" : ""}`}
          >
            <Link to={"/"} className="navbar__item" activeClassName="active">
              Home
            </Link>
            {data.allFile.edges
              .filter(edge => {
                return edge.node.name !== "404" && edge.node.name !== "index"
              })
              .map(edge => {
                const link = `/${edge.node.name}`
                const name = edge.node.name
                return (
                  <Link
                    key={edge.node.id}
                    to={link}
                    className="navbar__item"
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    {name}
                  </Link>
                )
              })}
          </nav>
          <IconButton
            aria-label="dark mode button"
            className="dark-button"
            onClick={() => setDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <FaSun className="sun-icon" />
            ) : (
              <FaMoon className="moon-icon" />
            )}
          </IconButton>
        </header>
      )}
    />
  )
}

export default Header
