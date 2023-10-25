import { getAllProducts, get_Product_By_ID } from "../dao/mongo/products.js";

export const getProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
};

export const getProductsByID = async (pid, res) => {
    const product = await get_Product_By_ID(pid);
    res.json(product);
};