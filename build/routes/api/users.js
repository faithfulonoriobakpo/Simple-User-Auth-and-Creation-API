"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../../models/User");
const users = express_1.default.Router();
users.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    try {
        if (username && password) {
            const user = new User_1.UserClass();
            const response = yield user.authenticate_user(username, password);
            res.json(response);
        }
        else {
            throw new TypeError('Payload must contain username and password');
        }
    }
    catch (err) {
        if (err instanceof TypeError) {
            res.status(400).json({ status: 400, message: err.message });
        }
        else {
            res.status(500).json({ status: 500, message: "Server Error" });
        }
    }
}));
users.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredkeys = ['username', 'password', 'email', 'sex'];
    try {
        const data = req.body;
        const requestBodykeys = Object.keys(data);
        const validPayload = requiredkeys.every((key) => requestBodykeys.includes(key) && data[key]);
        if (validPayload) {
            const new_user = new User_1.UserClass();
            const response = yield new_user.create_user(data);
            res.json(response);
        }
        else {
            throw new TypeError('all required keys and values must exist in payload');
        }
    }
    catch (err) {
        if (err instanceof TypeError) {
            res.status(400).send({ message: err.message });
        }
        else {
            res.send(err);
        }
    }
}));
exports.default = users;
