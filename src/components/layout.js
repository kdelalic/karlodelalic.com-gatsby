import React from "react"
import Header from "./header"
import "./layout.scss"

const Layout = props => (
  <React.Fragment>
    <Header />
    <div className={`content${props.centered ? " centered" : ""}`}>
      {props.title && <h1 className="title">{props.title}</h1>}
      {props.date && <p className="date">{props.date}</p>}
      <main>{props.children}</main>
    </div>
  </React.Fragment>
)

export default Layout
