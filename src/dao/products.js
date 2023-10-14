import { productModel } from '../models/product.js';

export const getAllProducts = async () => {
    return await productModel.find();
};

// export const add_User = async (newUser) => {
//     const user = userModel.create(newUser);
//     return user;
// };

export const get_Product_By_ID = async (pid) => {
    return await productModel.findOne(pid);
};