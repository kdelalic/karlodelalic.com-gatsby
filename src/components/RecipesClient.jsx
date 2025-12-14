import React, { useState, useMemo, useCallback } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";
import Recipe from "./Recipe";
import Chip from "./Chip";
import "../pages/_recipes.scss";

const RecipesClient = ({ recipes }) => {
  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const combinedRecipes = useMemo(() => {
    const normalizeRecipe = (recipe) => ({
      ...recipe,
      tags: Array.isArray(recipe.tags) ? recipe.tags.map((tag) => tag.toLowerCase()) : [],
    });

    const all = recipes.map(normalizeRecipe);

    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, [recipes]);

  const searchResults = useMemo(() => {
    if (!searchTerm) return combinedRecipes;
    const fuse = new Fuse(combinedRecipes, {
      keys: ["title"],
      includeScore: true,
      threshold: 0.4,
    });
    return fuse.search(searchTerm).map((result) => result.item);
  }, [combinedRecipes, searchTerm]);

  const filteredRecipes = useMemo(
    () =>
      searchResults.filter((recipe) => {
        const tags = recipe.tags || [];
        return filters.every((filter) => tags.includes(filter));
      }),
    [searchResults, filters]
  );

  const displayedTags = useMemo(() => {
    return new Set(
      searchResults.flatMap((recipe) => recipe.tags || [])
    );
  }, [searchResults]);

  const toggleTag = useCallback(
    (tag) => {
      setFilters((prevFilters) =>
        prevFilters.includes(tag)
          ? prevFilters.filter((t) => t !== tag)
          : [...prevFilters, tag]
      );
    },
    []
  );

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <>
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
        {filteredRecipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className="recipe-wrapper"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Recipe
              title={recipe.title}
              image={recipe.image}
              source={recipe.source}
              tags={recipe.tags}
              notes={recipe.notes}
              type={recipe.type}
              slug={recipe.slug}
              tagClick={toggleTag}
              tagFilters={filters}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipesClient;
