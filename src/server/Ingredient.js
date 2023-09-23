import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    // [] TODO: Add the ingredient schema here
    // [] TODO: Determine which nutrient fields, if any, want to include in the schema
    name: {
      type: String,
      required: true,
    },
    fdcId: {
      type: String,
    },
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema, "ingredients");
