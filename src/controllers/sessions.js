import { add_User, getAllUser, get_User } from "../dao/sessions.js";

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
        return null; // o puedes devolver un valor que indique que el usuario no se encontró
    }

    return result;
};


export const addUser = async (user, res) => {
    //console.log(req);
    //const usuarioExist = username;

    const result = await add_User(user);
    //console.log(result);
    if (!result) {
        return res.status(400).json({error: "No se pudo agregar el usuario"})
    }

    return result;
};
