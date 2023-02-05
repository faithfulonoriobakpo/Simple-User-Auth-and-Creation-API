import express, {NextFunction, Request, Response} from "express";
import {UserClass} from "../../models/User";
import jwt, { JsonWebTokenError } from "jsonwebtoken";


const users = express.Router();

// Middleware function to authenticate requests
const authenticate = (req:Request, res:Response, next:NextFunction) => {
    // get token from the headers
    const authorization = req.headers.authorization;
    const token = req.body.token || req.query.token || req.params.token || authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({status:401, message:"Access Denied. No Token Provided."});
    }
  
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      next();
    } catch (ex) {
      return res.status(400).json({status:400, message:"Invalid Token"});
    }
  };

users.post('/login', async (req:Request, res:Response) => {
    const data = req.body;
    const username:string = data.username as string;
    const password:string = data.password as string;
    try {
        if(username && password){
            const user = new UserClass();
            const response = await user.authenticate_user(username, password);
            res.json(response);
        }else {
            throw new TypeError('Payload must contain username and password');
        }
    } catch(err) {
        if (err instanceof TypeError){
            res.status(400).json({status: 400, message:err.message});
        }else{
            res.status(500).json({status:500, message:"Server Error"});
        }
    }
});

users.post('/signup', async (req:Request, res:Response) => {
    const requiredkeys = ['username', 'password', 'email', 'sex'];
    try {
        const data = req.body;
        const requestBodykeys = Object.keys(data);
        const validPayload = requiredkeys.every((key) => requestBodykeys.includes(key) && data[key]);
        if(validPayload){
            const new_user = new UserClass();
            const response = await new_user.create_user(data);
            res.json(response);
        }else {
            throw new TypeError('all required keys and values must exist in payload');
        }

    } catch (err){
        if(err instanceof TypeError) {
            res.status(400).json({status:400,message:err.message});
        } else {
            res.send(err);
        }
    }
});

users.get('/getallusers', authenticate, async (req:Request, res:Response) => {
    try{
        const users = new UserClass();
        const result = await users.list_users();
        res.send(result);
    }catch(err){
        if(err instanceof TypeError){
            res.status(400).json({status:400,message:err.message});
        }else{
            res.send(err);
        }
    }
});

export default users;
