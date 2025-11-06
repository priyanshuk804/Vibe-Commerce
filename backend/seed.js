import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = [
  { name: "T-Shirt", price: 499, image: "https://via.placeholder.com/150" },
  { name: "Sneakers", price: 1499, image: "https://via.placeholder.com/150" },
  { name: "Headphones", price: 999, image: "https://via.placeholder.com/150" },
  { name: "Smart Watch", price: 1999, image: "https://via.placeholder.com/150" }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(seedProducts);
    console.log("✅ Database Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedDB();
