import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // [] TODO: Add the user schema here
    // [] TODO: determine if addedRecipes should exist on UserSchema
    userId: {
        type: String,
        required: true,
    },
    likedRecipes: {
        type: [String],
        required: false,
    },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");

