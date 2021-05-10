import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Recipe from "../components/recipe"
import Chip from "../components/chip"

import "./recipes.scss"

const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
}

const RecipesPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
  },
}) => {
  const [firstRender, setFirstRender] = useState(false)
  const [filters, setFilters] = useState([])

  useEffect(() => {
    if (!firstRender) shuffle(postEdges)
    setFirstRender(true)
  }, [firstRender, postEdges])

  const allTags = new Set()

  postEdges.forEach(postEdge => {
    const tags = postEdge.node.frontmatter.tags
    tags.forEach(tag => {
      allTags.add(tag)
    })
  })

  const addTag = tag => {
    const tagIdx = filters.indexOf(tag)
    if (tagIdx === -1) filters.push(tag)
    else filters.splice(tagIdx, 1)
    setFilters([...filters])
  }

  return (
    <Layout title="Recipes">
      <Seo title="Recipes" keywords={[...Constants.tags, "recipes"]} />
      <div className="chips">
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
      </div>
      <div className="recipes">
        {postEdges
          .filter(({ node }) => {
            const { tags } = node.frontmatter

            return new Set([...filters, ...tags]).size <= tags.length
          })
          .map(({ node }) => {
            const { source, tags, title, image } = node.frontmatter
            return (
              <Recipe
                key={node.id}
                source={source}
                tags={tags}
                title={title}
                image={image}
                tagClick={addTag}
                tagFilters={filters}
              />
            )
          })}
      </div>
    </Layout>
  )
}

export const query = graphql`{
  allMarkdownRemark(filter: {frontmatter: {type: {eq: "recipe"}}}) {
    edges {
      node {
        id
        html
        frontmatter {
          title
          type
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
