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
// users.post('/login', async (req:Request, res:Response) => {
//     const data = req.body;
//     const username:string = data.username as string;
//     const password:string = data.password as string;
//     try {
//         let user = new UserClass();
//         const response = await new_user.authenticate_user(username, password);
//         if(){
//         }
//     } catch(err) {
//         res.json({message:err});
//     }
// });
users.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const new_user = new User_1.UserClass();
        const response = yield new_user.create_user(data);
        res.json(response);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = users;
