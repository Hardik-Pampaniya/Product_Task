const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const fileHandleMiddleware = require("../middleware/fileHandleMiddleware");
const { createProduct, deleteProduct, getProductsByUser, updateProduct } = require('../controllers/productController');


const productRoutes = express.Router();

// Create product
productRoutes.put(
  "/create/product",
  fileHandleMiddleware.array("images", 5),
  createProduct
);

//Get categories by user
productRoutes.get("/get/products", getProductsByUser);

//Update product
productRoutes.put(
  "/update/product/:productId",
  fileHandleMiddleware.array("images", 5),
  updateProduct
);

//Delete product
productRoutes.delete(
  "/delete/product/:productId",
  deleteProduct
);
module.exports = productRoutes;