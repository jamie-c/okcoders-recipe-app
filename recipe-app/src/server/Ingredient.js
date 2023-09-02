import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  // [] TODO: Add the ingredient schema here
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema, "ingredients");
