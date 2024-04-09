const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategory,
  deleteCategory,
  getCategoryByUser,
  updateCategory
} = require('../controllers/categoryController');

const categoryRoutes = express.Router();

// Create Category
categoryRoutes.post("/create/category", createCategory);

//Get categories by user
categoryRoutes.get("/get/category"  , getCategoryByUser);

//Update category
categoryRoutes.post(
  "/update/category/:categoryId",
  updateCategory
);

//Delete category
categoryRoutes.delete(
  "/delete/category/:categoryId",
  deleteCategory
);
module.exports = categoryRoutes;