import React, { useState } from "react"
import { graphql, Link, StaticQuery } from "gatsby"

import Logo from "../assets/images/logo.svg";

import "./header.scss"

const Header = () => {

  const [isNavbarOpen, setNavbarOpen] = useState(false);

  return (
    <StaticQuery
      query={graphql`
            query PageInfoQuery {
                allFile(
                  filter: { 
                    sourceInstanceName: { eq: "pages" } 
                    extension: { eq: "js" }
                  }) {
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
            <Link to={"/"} className="brand__logo">
              <Logo />
            </Link>
            <span className="brand__name">Karlo Delalic</span>
          </div>
          <div onClick={() => setNavbarOpen(!isNavbarOpen)} className={`navbar-burger${isNavbarOpen ? " open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav onClick={() => setNavbarOpen(false)} className={`navbar${isNavbarOpen ? " open" : ""}`}>
            <Link to={"/"} className="navbar__item" activeClassName="active">Home</Link>
            {data.allFile.edges
              .filter(edge => {
                return edge.node.name !== "404" && edge.node.name !== "index"
              })
              .map(edge => {
                const link = `/${edge.node.name}`;
                const name = edge.node.name;
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
              })
            }
          </nav>
        </header>
      )}
    />
  )
}

export default Header
