import { userModel } from '../models/user.js';

export const getAllUser = async () => {
    return await userModel.find();
};

export const add_User = async (newUser) => {
    const user = userModel.create(newUser);
    return user;
};

export const get_User = async (username) => {
    return await userModel.findOne({ email: username });
};