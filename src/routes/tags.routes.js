const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsCrontroller = new TagsController();

// usersRoutes.use(myMiddleware)
tagsRoutes.get("/", ensureAuthenticated, tagsCrontroller.index);

module.exports = tagsRoutes;