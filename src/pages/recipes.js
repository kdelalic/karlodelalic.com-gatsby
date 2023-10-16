import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Recipe from "../components/recipe"
import Chip from "../components/chip"

import "./recipes.scss"

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const RecipesPage = ({ data: { allMarkdownRemark: { edges: postEdges } } }) => {
  const [firstRender, setFirstRender] = useState(false)
  const [filters, setFilters] = useState([])

  useEffect(() => {
    if (!firstRender) {
      shuffleArray(postEdges)
      setFirstRender(true)
    }
  }, [firstRender, postEdges])

  const allTags = new Set(postEdges.flatMap(postEdge => postEdge.node.frontmatter.tags))

  const toggleTag = tag => {
    setFilters(prevFilters =>
      prevFilters.includes(tag)
        ? prevFilters.filter(t => t !== tag)
        : [...prevFilters, tag]
    )
  }

  return (
    <Layout title="Recipes">
      <div className="chips">
        {[...allTags].sort().map(tag => (
          <Chip
            key={tag}
            active={filters.includes(tag)}
            onClick={() => toggleTag(tag)}
            label={tag}
          />
        ))}
      </div>
      <div className="recipes">
        {postEdges
          .filter(({ node }) => {
            const { tags } = node.frontmatter
            return filters.every(filter => tags.includes(filter))
          })
          .map(({ node }) => (
            <Recipe
              key={node.id}
              {...node.frontmatter}
              tagClick={toggleTag}
              tagFilters={filters}
            />
          ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {type: {eq: "recipe"}}}) {
    edges {
      node {
        id
        frontmatter {
          title
          source
          tags
          image {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`

export default RecipesPage

export const Head = () => (
  <Seo title="Recipes" keywords={[...Constants.tags, "recipes"]} />
)
