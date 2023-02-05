"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function to authenticate requests
const authenticate = (req, res, next) => {
    // get token from the headers
    const authorization = req.headers.authorization;
    const token = req.body.token || req.query.token || req.params.token || (authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ status: 401, message: "Access Denied. No Token Provided." });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (ex) {
        return res.status(400).json({ status: 400, message: "Invalid Token" });
    }
};
exports.authenticate = authenticate;
