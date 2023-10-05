import { Router } from "express";
import { userModel } from "../dao/models/user.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.get('/github', passport.authenticate('github', {scope: ['email']}), async (req, res) => {
    console.log('pasó x aca');
});

router.get('/githubCallback', passport.authenticate('github',  { failureRedirect: '/failLoginGit' }), async (req, res) => {
    console.log('todo bien con git');
    req.session.user = req.user;
    res.redirect('/products');
});

router.get('/failLoginGit', (req, res) => {
    res.send({error: "Failed Login con GitHub"});
});


router.get('/current', (req, res)=> { 
    res.send({status: "success", payload: req.user});//.redirect('/products');
});

// ESTO FUNCIONABAAAAAA EN PASSPORT.JS
router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failLogin'}) ,async (req, res) => {
    if (!req.user) {
        console.log("entro aca ");
        return res.status(400).send({status: "error", error: "Credenciales invalidas"});
    }
    delete req.user.password;
    req.session.user = req.user;
    res.send({status: "success", payload: req.user})
});

router.get('/failLogin', (req,res)=> {
    return res.status(400).send({status: "error", error: "Usuario no existe o password incorrecto"});
});

// ESTO FUNCIONABAAAAAA EN PASSPORT.JS
router.post('/register', passport.authenticate('register', {failureRedirect: '/failRegister'}) ,async (req, res) => {
    res.send({status: "success", message: "Usuario registrado"})
})
// router.post('/register', (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;

//     const user = {
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password)
//     }
//     const accessToken = generateToken(user);
//     res.send({status: "success", accessToken})
// })

router.get('/failRegister', async(req, res)=> {
    console.log("Fallo la estrategia");
    res.send({error:"Failed register"});
})

router.post('/resetPassword', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ status: "error", error: "Datos incompletos" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ status: "error", error: "No existe el usuario" });
    }
    const passwordHash = createHash(password);
    await userModel.updateOne({ email }, { $set: { password: passwordHash } })
    res.send({status: "success", message: "password reseteado"})
})

router.post('/logout', (req, res) => {
    // Verifica si el usuario tiene una sesión válida antes de intentar destruirla
    if (req.session && req.session.user) {
        req.session.destroy((err) => { // Destruye la sesión
            if (err) {
                console.error('Error al cerrar la sesión:', err);
                res.status(500).json({
                    error: 'Error al cerrar la sesión'
                });
            } else {
                // La sesión se ha destruido con éxito
                res.status(200).json({
                    message: 'Sesión cerrada exitosamente'
                });
            }
        });
    } else {
        res.status(200).json({
            message: 'No hay sesión para cerrar'
        });
    }
});

export default router;