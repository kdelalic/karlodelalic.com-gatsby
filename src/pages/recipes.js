import React, { useState, useMemo, useCallback } from "react"
import { graphql } from "gatsby"
import { TextField, InputAdornment } from "@mui/material"
import { FaSearch } from "react-icons/fa"
import Fuse from "fuse.js"

import Constants from "../globals/constants"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Recipe from "../components/recipe"
import Chip from "../components/chip"

import "./recipes.scss"


const RecipesPage = ({ data: { recipes, customRecipes } }) => {
  const [filters, setFilters] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Combine, normalize, and shuffle recipes only once
  const combinedEdges = useMemo(() => {
    const normalizeTags = (edges) =>
      edges.map(({ node }) => ({
        ...node,
        frontmatter: {
          ...node.frontmatter,
          tags: Array.isArray(node.frontmatter.tags)
            ? node.frontmatter.tags.map((tag) => tag.toLowerCase())
            : [],
        },
      }))
    const all = [
      ...normalizeTags(recipes.edges),
      ...normalizeTags(customRecipes.edges),
    ]
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [recipes.edges, customRecipes.edges])

  // Fuse.js search
  const searchResults = useMemo(() => {
    if (!searchTerm) return combinedEdges
    const fuse = new Fuse(combinedEdges, {
      keys: ["frontmatter.title"],
      includeScore: true,
      threshold: 0.4,
    })
    return fuse.search(searchTerm).map((result) => result.item)
  }, [combinedEdges, searchTerm])

  // Filter recipes based on selected tags
  const filteredRecipes = useMemo(
    () =>
      searchResults.filter((node) => {
        const tags = node.frontmatter.tags || []
        return filters.every((filter) => tags.includes(filter))
      }),
    [searchResults, filters]
  )

  // Displayed tags
  const displayedTags = useMemo(() => {
    return new Set(
      searchResults.flatMap((node) => node.frontmatter.tags || [])
    )
  }, [searchResults])

  // Memoize handlers
  const toggleTag = useCallback(
    (tag) => {
      setFilters((prevFilters) =>
        prevFilters.includes(tag)
          ? prevFilters.filter((t) => t !== tag)
          : [...prevFilters, tag]
      )
    },
    []
  )

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  return (
    <Layout title="Recipes">
      <div className="searchContainer">
        <TextField
          label="Search"
          type="search"
          onChange={handleSearchChange}
          variant="outlined"
          className="search"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <FaSearch />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      <div className="chips">
        {[...(displayedTags || [])].sort().map((tag) => (
          <Chip
            key={tag}
            active={filters.includes(tag)}
            onClick={() => toggleTag(tag)}
            label={tag}
          />
        ))}
      </div>
      <div className="recipes">
        {filteredRecipes.map((node, index) => (
          <div
            key={node.id}
            className="recipe-wrapper"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Recipe
              {...node.frontmatter}
              slug={node.fields?.slug}
              tagClick={toggleTag}
              tagFilters={filters}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
{
  recipes: allMarkdownRemark(filter: { frontmatter: { type: { eq: "recipe" } } }) {
    edges {
      node {
        id
        frontmatter {
          title
          notes
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
  customRecipes: allMarkdownRemark(filter: { frontmatter: { type: { eq: "custom-recipe" } } }) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          type
          notes
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
