import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import DarkModeSwitch from "./darkmodeswitch"

import Logo from "../../content/assets/images/logo.svg"
import "./header.scss"

const Header = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false)

  const toggleNavbar = () => setNavbarOpen(prev => !prev);
  const closeNavbar = () => setNavbarOpen(false);

  const data = useStaticQuery(graphql`
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
  `)

  return (
    <header>
      <div className="brand">
        <Link to={"/"} aria-label="Brand Logo" className="brand__logo">
          <Logo />
        </Link>
        <span className="brand__name">Karlo Delalic</span>
      </div>
      <div
        onClick={toggleNavbar}
        onKeyDown={toggleNavbar}
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
        onClick={closeNavbar}
        onKeyDown={closeNavbar}
        className={`navbar${isNavbarOpen ? " open" : ""}`}
      >
        <Link to={"/"} className="navbar__item" activeClassName="active">
          Home
        </Link>
        {data.allFile.edges
          .filter(edge => edge.node.name !== "404" && edge.node.name !== "index")
          .map(edge => (
            <Link
              key={edge.node.id}
              to={`/${edge.node.name}`}
              className="navbar__item"
              activeClassName="active"
              partiallyActive={true}
            >
              {edge.node.name}
            </Link>
          ))}
      </nav>
      <DarkModeSwitch />
    </header>
  )
}

export default Header
