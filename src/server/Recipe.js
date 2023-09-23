import mongoose from 'mongoose'

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
        type: [{ id: String, name: String, amount: String, unit: String }],
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    },
    prepTime: {
        type: { hours: Number, minutes: Number },
        required: true,
    },
    cookTime: {
        type: { hours: Number, minutes: Number },
        required: true,
    },
    servings: {
        type: { amount: Number, unit: String },
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
    userId: {
        type: String,
        required: true,
    },
})

export default mongoose.models.Recipe ||
    mongoose.model('Recipe', RecipeSchema, 'recipes')
