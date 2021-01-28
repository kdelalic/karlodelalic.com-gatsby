import React, { useState } from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Recipe from "../components/recipe"
import Chip from "../components/chip"

import "./recipes.scss"

const RecipesPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    recipeImages: { edges: recipeImageEdges },
  },
}) => {
  const recipeImages = {}

  recipeImageEdges.forEach(({ node }) => {
    recipeImages["/" + node.relativeDirectory] = node.publicURL
  })

  const allTags = new Set()

  postEdges.forEach(postEdge => {
    const tags = postEdge.node.frontmatter.tags
    tags.forEach(tag => {
      allTags.add(tag)
    })
  })

  const [filters, setFilters] = useState([])

  const addTag = tag => {
    const tagIdx = filters.indexOf(tag)
    if (tagIdx === -1) filters.push(tag)
    else filters.splice(tagIdx)
    setFilters([...filters])
  }

  return (
    <Layout title="Recipes">
      <SEO title="Recipes" keywords={[...Constants.tags, "recipes"]} />
      {[...allTags].sort().map(tag => {
        return (
          <Chip
            key={tag}
            active={filters.includes(tag)}
            onClick={() => addTag(tag)}
            label={tag}
          />
        )
      })}
      <div className="recipes">
        {postEdges
          .filter(({ node }) => {
            const { tags } = node.frontmatter

            return new Set([...filters, ...tags]).size <= tags.length
          })
          .map(({ node }) => {
            const { source, tags, title } = node.frontmatter
            const { slug } = node.fields

            return (
              <Recipe
                key={node.id}
                source={source}
                tags={tags}
                title={title}
                image={recipeImages[slug]}
              />
            )
          })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: "recipe" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            type
            source
            tags
          }
          fields {
            slug
          }
        }
      }
    }
    recipeImages: allFile(
      filter: {
        absolutePath: { regex: "/recipes/" }
        base: { glob: "image.*" }
      }
    ) {
      edges {
        node {
          publicURL
          relativeDirectory
        }
      }
    }
  }
`

export default RecipesPage
