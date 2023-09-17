import React, { useState } from "react";
import "./form.css";

function RecipeForm() {
  const [formData, setFormData] = useState({
    recipeName: "",
    description: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    imageUrl: "",
    tags: "",
    createdBy: "",
    submittedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="recipe-form-container">
      <h2>Recipe Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name:</label>
          <input
            type="text"
            id="recipe-name"
            name="recipeName"
            className="form-control"
            value={formData.recipeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-control"
            value={formData.ingredients}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-control"
            value={formData.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="prep-time">Prep Time (minutes):</label>
          <input
            type="number"
            id="prep-time"
            name="prepTime"
            className="form-control"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cook-time">Cook Time (minutes):</label>
          <input
            type="number"
            id="cook-time"
            name="cookTime"
            className="form-control"
            value={formData.cookTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input
            type="number"
            id="servings"
            name="servings"
            className="form-control"
            value={formData.servings}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image-url">Image URL:</label>
          <input
            type="url"
            id="image-url"
            name="imageUrl"
            className="form-control"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="created-by">Created By:</label>
          <input
            type="text"
            id="created-by"
            name="createdBy"
            className="form-control"
            value={formData.createdBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="submitted-by">Submitted By:</label>
          <input
            type="text"
            id="submitted-by"
            name="submittedBy"
            className="form-control"
            value={formData.submittedBy}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
