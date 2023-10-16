import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Chip from "./chip";
import "./recipe.scss";

const Recipe = ({ image, source, tags, title, tagClick, tagFilters }) => {
  const tagFiltersSet = new Set(tagFilters);

  const handleTagClick = (tag) => {
    tagClick(tag);
  };

  return (
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
            <GatsbyImage className="recipe__image" alt={title} image={getImage(image) ?? undefined} />
          </a>
        )}
        <div className="recipe__body__chips">
          {tags.sort().map(tag => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              active={tagFiltersSet.has(tag)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Recipe);
