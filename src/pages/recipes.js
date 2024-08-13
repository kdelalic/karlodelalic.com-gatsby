import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { TextField, InputAdornment } from "@mui/material"
import { FaSearch } from "react-icons/fa";
import Fuse from 'fuse.js'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(postEdges)
  const [displayedTags, setDisplayedTags] = useState(new Set())

  useEffect(() => {
    if (!firstRender) {
      shuffleArray(postEdges)
      setFirstRender(true)
    }

    const fuse = new Fuse(postEdges, {
      keys: ['node.frontmatter.title'],
      includeScore: true,
      threshold: 0.4
    })

    let filteredResults = postEdges;
    if (searchTerm) {
      filteredResults = fuse.search(searchTerm).map(result => result.item);
      setSearchResults(filteredResults);
    } else {
      setSearchResults(postEdges);
    }

    const newDisplayedTags = new Set(
      filteredResults.flatMap(({ node }) => node.frontmatter.tags)
    );
    setDisplayedTags(newDisplayedTags);
  }, [firstRender, postEdges, searchTerm])

  const toggleTag = tag => {
    setFilters(prevFilters =>
      prevFilters.includes(tag)
        ? prevFilters.filter(t => t !== tag)
        : [...prevFilters, tag]
    )
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Layout title="Recipes">
      <div className="searchContainer">
        <TextField 
          label="Search" 
          type="search" 
          onChange={handleSearchChange} 
          variant="outlined"
          className="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="chips">
        {[...displayedTags].sort().map(tag => (
          <Chip
            key={tag}
            active={filters.includes(tag)}
            onClick={() => toggleTag(tag)}
            label={tag}
          />
        ))}
      </div>
      <div className="recipes">
        {searchResults
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
