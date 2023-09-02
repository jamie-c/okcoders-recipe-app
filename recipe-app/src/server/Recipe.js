import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  // [] TODO: Finalize the recipe schema here
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [{ id: String, amount: String, unit: String }],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  prepTime: {
    type: Number,
    required: true,
  },
  cookTime: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", RecipeSchema, "recipes");
