const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");


const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryName } = req.body;
    const createdBy = req.user.userId;
    const images = req.files
      ? req.files.map((file) => file.filename)
      : null;

    console.log(req.files);

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !createdBy ||
      !images
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find or create category
    const [category] = await sequelize.query(
      `SELECT categoryId FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
      {
        replacements: { categoryName, createdBy },
        type: QueryTypes.SELECT,
      }
    );

    let categoryId = category?.categoryId;

    if (!categoryId) {
      // Create new category if not found
      await sequelize
        .query(
          `INSERT INTO categories (categoryName, createdBy) VALUES (:categoryName, :createdBy)`,
          {
            replacements: { categoryName, createdBy },
            type: QueryTypes.INSERT,
          }
        )
        .then(([results, metadata]) => {
          categoryId = metadata.lastInsertId;
        });
    }

    // Create product
    await sequelize.query(
      `INSERT INTO products (name, description, price, categoryId, createdBy, images) VALUES (:name, :description, :price, :categoryId, :createdBy, :images)`,
      {
        replacements: {
          name,
          description,
          price,
          categoryId,
          createdBy,
          images: JSON.stringify(images),
        },
        type: QueryTypes.INSERT,
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
    //Get the productId from the params
    const { productId } = req.params;
  
    //Get the userId from the request
    const createdBy = req.user.userId;
  
    //Get the role of the user from  the request
    const userRole = req.user.roleName;
  
    try {
      const product = await sequelize.query(
        `SELECT * FROM products WHERE productId = :productId`,
        {
          replacements: { productId },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      if (product.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      //Check if the user is not an admin and the product was not created by the user
      if (userRole !== "admin" && product[0].createdBy !== createdBy) {
        return res.status(403).json({ message: "Not Authorized" });
      }
  
      //Delete the product
      await sequelize.query(`DELETE FROM products WHERE productId = :productId`, {
        replacements: { productId },
        type: sequelize.QueryTypes.DELETE,
      });
  
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


  const getProductsByUser = async (req, res) => {
    const createdBy = req.user.userId;
    const userRole = req.user.roleName;
    let productResult;
  
    try {
      if (userRole === "admin") {
        productResult = await sequelize.query(`SELECT * FROM products`, {
          type: QueryTypes.SELECT,
        });
      } else {
        productResult = await sequelize.query(
          `SELECT * FROM products WHERE createdBy = :createdBy`,
          {
            replacements: { createdBy },
            type: QueryTypes.SELECT,
          }
        );
      }
  
      if (!productResult.length) {
        return res.status(404).json({ message: "No products found" });
      }
  
      return res
        .status(200)
        .json({ message: "success", products: productResult });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



  const updateProduct = async (req, res) => {
    //Get the product details from the request
    const { name, description, price, categoryName } = req.body;
  
    // Get product images from the request
    const images = req.files
      ? req.files.map((file) => file.filename)
      : null;
  
    //Get the productId from the request
    const { productId } = req.params;
  
    //Get the userId from the request
    const createdBy = req.user.userId;
  
    console.log("createdBy", createdBy);
  
    //Get the role of the user from  the request
    const userRole = req.user.roleName;
  
    if (!name || !description || !price || !categoryName) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const [product] = await sequelize.query(
        `SELECT * FROM products WHERE productId = :productId`,
        {
          replacements: { productId },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      console.log("product", product);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (userRole !== "admin" && product.createdBy !== createdBy) {
        return res.status(403).json({ message: "Not Authorized" });
      }
  
      // Find or create category
      const [category] = await sequelize.query(
        `SELECT categoryId FROM categories WHERE categoryName = :categoryName AND createdBy = :createdBy`,
        {
          replacements: { categoryName, createdBy },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      let categoryId = category?.categoryId;
  
      // Create new category if not found
      if (!categoryId) {
        const [newCategory] = await sequelize.query(
          `INSERT INTO categories (categoryName, createdBy) VALUES (:categoryName, :createdBy) RETURNING categoryId`,
          {
            replacements: { categoryName, createdBy },
            type: sequelize.QueryTypes.INSERT,
          }
        );
        categoryId = newCategory?.categoryId;
      }
  
      // Update product
      await sequelize.query(
        `UPDATE products SET name = :name, description = :description, price = :price, images = :images WHERE productId = :productId`,
        {
          replacements: {
            name,
            description,
            price,
            images: JSON.stringify(images),
            productId,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
  
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  



  module.exports = { createProduct, deleteProduct, getProductsByUser, updateProduct };
