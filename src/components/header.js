import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"

import Logo from "../assets/images/logo.svg";

import "./header.scss"

const Header = () => (
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
        <nav className="navbar">
          <Link to={"/"} className="navbar__item" activeClassName="active">Home</Link>
          {data.allFile.edges
            .filter(edge => {
              return edge.node.name !== "404" && edge.node.name !== "index"
            })
            .map(edge => {
              const link = `/${edge.node.name}`;
              const name = edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1);
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

export default Header
