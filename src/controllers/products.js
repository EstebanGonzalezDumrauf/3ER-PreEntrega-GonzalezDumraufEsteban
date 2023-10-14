import { getAllProducts, get_Product_By_ID } from "../dao/products.js";

export const getProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
};

export const getProductsByID = async (pid, res) => {
    const products = await getAllProducts(pid);
    res.json(products);
};