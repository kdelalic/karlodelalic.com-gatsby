import React, { useState, useEffect } from "react"
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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const RecipesPage = ({ data: { recipes, customRecipes } }) => {
  const [firstRender, setFirstRender] = useState(false)
  const [filters, setFilters] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  // Combine recipes and custom recipes arrays into one list.
  const combinedEdges = [...recipes.edges, ...customRecipes.edges]

  const [searchResults, setSearchResults] = useState(combinedEdges)
  const [displayedTags, setDisplayedTags] = useState(new Set())

  // Normalize tags for nodes that have them.
  combinedEdges.forEach(({ node }) => {
    if (node.frontmatter.tags && Array.isArray(node.frontmatter.tags)) {
      node.frontmatter.tags = node.frontmatter.tags.map((tag) => tag.toLowerCase())
    }
  })

  useEffect(() => {
    if (!firstRender) {
      shuffleArray(combinedEdges)
      setFirstRender(true)
    }

    const fuse = new Fuse(combinedEdges, {
      keys: ["node.frontmatter.title"],
      includeScore: true,
      threshold: 0.4,
    })

    let filteredResults = combinedEdges
    if (searchTerm) {
      filteredResults = fuse.search(searchTerm).map((result) => result.item)
      setSearchResults(filteredResults)
    } else {
      setSearchResults(combinedEdges)
    }

    const newDisplayedTags = new Set(
      filteredResults.flatMap(({ node }) => node.frontmatter.tags || [])
    )
    setDisplayedTags(newDisplayedTags)
  }, [firstRender, combinedEdges, searchTerm])

  const toggleTag = (tag) => {
    setFilters((prevFilters) =>
      prevFilters.includes(tag)
        ? prevFilters.filter((t) => t !== tag)
        : [...prevFilters, tag]
    )
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Filter recipes based on selected tags
  const filteredRecipes = searchResults.filter(({ node }) => {
    const tags = node.frontmatter.tags || []
    return filters.every((filter) => tags.includes(filter))
  })

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
            }
          }}
        />
      </div>
      <div className="chips">
        {[...(displayedTags || [])].sort().map(tag => (
          <Chip
            key={tag}
            active={filters.includes(tag)}
            onClick={() => toggleTag(tag)}
            label={tag}
          />
        ))}
      </div>
      <div className="recipes">
        {filteredRecipes.map(({ node }, index) => (
          <div key={node.id} className="recipe-wrapper" style={{ animationDelay: `${index * 0.05}s` }}>
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
