import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"

const Header = () => (
    <StaticQuery
        query={graphql`
            query PageInfoQuery{
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
                <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                }}
                >
                <ul style={{ display: 'flex', flex: 1, listStyle: 'none' }}>
                    {data.allFile.edges
                        .filter(edge => {
                            return edge.node.name !== "404" 
                        })
                        .map(edge => {
                            let link = "/";
                            let name = "Home"
                            if (edge.node.name !== "index") {
                                link += edge.node.name;
                                name = edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1);
                            }

                            return (
                                <li key={edge.node.id}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            )
                        }
                    )}
                </ul>
                <h1 style={{ margin: 0 }}>
                    
                </h1>
                </div>
            </header>
        )}
    />
)

export default Header
