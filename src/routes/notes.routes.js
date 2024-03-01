const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const notesCrontroller = new NotesController();
notesRoutes.use(ensureAuthenticated);

// usersRoutes.use(myMiddleware)
notesRoutes.get("/", notesCrontroller.index);
notesRoutes.post("/", notesCrontroller.create);
notesRoutes.get("/:id", notesCrontroller.show);
notesRoutes.delete("/:id", notesCrontroller.delete);

module.exports = notesRoutes;





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