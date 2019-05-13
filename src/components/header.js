import { Link } from "gatsby"
import React from "react"

const Header = () => (
  <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <ul>
        <li>
            <Link
                to="/"
                style={{
                color: `white`,
                textDecoration: `none`,
                }}
            >
            test
            </Link>
        </li>
      </ul>
      <h1 style={{ margin: 0 }}>
        
      </h1>
    </div>
  </header>
)

export default Header
