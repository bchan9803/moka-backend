import express from 'express';
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

// fetch recipes
router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  }
  catch (err) {
    res.json(err);
  }
});

// create recipes
router.post('/', async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  }
  catch (err) {
    res.json(err);
  }
});

export { router as recipesRouter }; 