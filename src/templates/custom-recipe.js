import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import "./custom-recipe.scss";

const CustomRecipe = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const image = frontmatter.image ? getImage(frontmatter.image) : null;
  
  return (
    <Layout title={frontmatter.title} date={frontmatter.date}>
      <div className="custom-recipe">
        <article>
          {image && <GatsbyImage image={image} alt={frontmatter.title} />}
          <h2>Ingredients</h2>
          {frontmatter.ingredients && (
            <ul>
              {frontmatter.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          <h2>Steps</h2>
          <div className="steps" dangerouslySetInnerHTML={{ __html: html }} />
          {frontmatter.notes && (
            <>
              <h2>Notes</h2>
              <div className="notes" dangerouslySetInnerHTML={{ __html: frontmatter.notes }} />
            </>
          )}
        </article>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        ingredients
        notes
        image {
          childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

export default CustomRecipe;
