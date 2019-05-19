import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"

import "./header.scss"

const Header = () => (
    <StaticQuery
        query={graphql`
            query PageInfoQuery {
                allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
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
                    <nav>
                        <Link to={"/"} className="navbar-item">Home</Link>
                        {data.allFile.edges
                            .filter(edge => {
                                return edge.node.name !== "404"  && edge.node.name !== "index"
                            })
                            .map(edge => {
                                const link = `/${edge.node.name}`;
                                const name = edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1);
                                return (
                                    <Link key={edge.node.id} to={link} className="navbar-item">{name}</Link>
                                )
                            }
                        )}
                    </nav>
            </header>
        )}
    />
)

export default Header
