import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userAuthor: {
    type: String,
    required: true
  },
  userAuthorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  imageUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  recipeTime: {
    type: String,
    required: true
  },
  // array of ingredients
  ingredients: [{
    type: String,
    required: true
  }],
  // array of instructions
  instructions: [{
    type: String,
    required: true
  }]
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);