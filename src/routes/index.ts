import express from "express";
import users from "./api/users";

const routes = express.Router();

routes.use('/api', users);

export default routes;
