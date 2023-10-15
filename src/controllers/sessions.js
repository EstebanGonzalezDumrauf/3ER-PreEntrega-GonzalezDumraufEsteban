import { add_User, getAllUser, get_User, reset_Pass } from "../dao/sessions.js";

const sessions = [];

export const getSession = async (req, res) => {
    const users = await getAllUser();
    res.json(users);
};

export const setSession = async (req, res) => {
    const newSession = req.body;
    if (!newSession) {
        return res.status(400).json({error: "Se produjo un error al registrar la session"})
    }

    const result = await addUser(newSession);
    res.json(result);
}

export const getUser = async (email) => {
    const usuarioExist = email;
    const result = await get_User(usuarioExist);

    if (!result) {
        return null;
    }
    return result;
};

export const addUser = async (user, res) => {
    const result = await add_User(user);
    if (!result) {
        return res.status(400).json({error: "No se pudo agregar el usuario"})
    }
    return result;
};

export const resetPassword = async (email, password, res) => {
    if (!email || !password) {
        return res.status(400).send({ status: "error", error: "Datos incompletos" });
    }
    const result = await reset_Pass(email, password);
    return result;
};
