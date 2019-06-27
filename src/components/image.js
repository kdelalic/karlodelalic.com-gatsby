import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = () => (
  <StaticQuery
    query={graphql`
      {
        placeholderImage: file(relativePath: { eq: "profile.png" }) {
          childImageSharp {
            fluid(maxWidth: 175) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
)
export default Image
