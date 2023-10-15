import { cartModel } from '../models/cart.js';

export const getAllCarts = async () => {
    return await cartModel.find();
};

export const get_Cart_By_ID = async (cid) => {
    return await cartModel.findOne(cid);
};

export const get_Products_of_Cart = async (cid) => {
    return await cartModel.findOne({ _id: cid }).populate('arrayCart.product');
}