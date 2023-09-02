import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // [] TODO: Add the user schema here
    // [] TODO: determine if addedRecipes should exist on UserSchema
    name: {
        type: String,
        required: true,
    },
    likedRecipes: {
        type: [String],
        required: true,
    },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");

