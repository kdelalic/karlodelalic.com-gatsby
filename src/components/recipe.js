import React from "react"
import Img from "gatsby-image"

import Chip from "./chip"

import "./recipe.scss"

const Recipe = ({ image, source, tags, title, tagClick, tagFilters }) => (
  <div className="recipe">
    <h2 className="recipe__title">{title}</h2>
    <div className="recipe__body">
      {image && (
        <a
          href={source}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="recipe__link"
        >
          <Img className="recipe__image" alt={title} fluid={image} />
        </a>
      )}
      <div className="recipe__body__chips">
        {tags.sort().map(tag => {
          return (
            <Chip
              key={tag}
              label={tag}
              onClick={() => tagClick(tag)}
              active={tagFilters.includes(tag)}
            />
          )
        })}
      </div>
    </div>
  </div>
)

export default Recipe
