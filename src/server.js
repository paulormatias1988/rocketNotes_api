require("dotenv/config");
require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

migrationsRun();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

// Route Params - GET
// app.get("/message/:id/:user", (request, response) => {
//     const { id, user } = request.params

//     response.send(`
//         Mensagem ID: ${id}.
//         Para o usuário: ${user}.
//     `);
// });

// Query Params - GET
// app.get("/users", (request, response) => {
//     const { page, limit } = request.query;

//     response.send(`Página: ${page}. Mostrar: ${limit}`);
// });

// POST
// app.post("/users", (request, response) => {
//     const { name, email, password } = request.body

//     // response.send(`Usuário: ${name}. E-mail: ${email}. E a senha é: ${password}`);
//     response.json({ name, email, password });
// });
