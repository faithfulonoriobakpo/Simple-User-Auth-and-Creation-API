import express from "express";
import users from "./api/users";

const routes = express.Router();

routes.use('/api', users);

routes.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });

export default routes;
