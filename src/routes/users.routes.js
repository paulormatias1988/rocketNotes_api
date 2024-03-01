const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersCrontroller = require("../controllers/UsersCrontroller");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersCrontroller = new UsersCrontroller();
const userAvatarController = new UserAvatarController();

// usersRoutes.use(myMiddleware)
usersRoutes.post("/", usersCrontroller.create);
usersRoutes.put("/", ensureAuthenticated, usersCrontroller.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;





// function myMiddleware(request, response, next){
//     console.log("Você passou pelo middleware.");

//     if (!request.body.isAdmin) {
//         return response.json({ message: "Usuário não autorizado."})
//     }

//     next();
// }



// POST
// userRoutes.post("/", (request, response) => {
//     const { name, email, password } = request.body

//     // response.send(`Usuário: ${name}. E-mail: ${email}. E a senha é: ${password}`);
//     response.json({ name, email, password });
// });