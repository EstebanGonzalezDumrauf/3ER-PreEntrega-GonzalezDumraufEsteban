import { getAllCarts, get_Cart_By_ID, get_Products_of_Cart } from "../dao/mongo/carts.js";

export const getCarts = async (req, res) => {
    const carts = await getAllCarts();
    res.json(carts);
};

export const getCartByID = async (cid, res) => {
    const cart = await get_Cart_By_ID(cid);
    res.json(products);
};

export const getProductsOfCart = async (cid, res) => {
    const products = await get_Products_of_Cart(cid);
    return products;
};