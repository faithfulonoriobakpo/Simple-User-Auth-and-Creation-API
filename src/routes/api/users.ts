import express, {Request, Response} from "express";
import { User, UserClass } from "../../models/User";
const users = express.Router();

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
            res.json({err});
        }
    }
});

users.post('/signup', async (req:Request, res:Response) => {
    const requiredkeys = ['username', 'password', 'email', 'sex'];
    try {
        const data: User = req.body;
        console.log(data);
        const allKeysExists = requiredkeys.every((key) => {
            data.hasOwnProperty(key);
        });
        console.log(allKeysExists);
        if(allKeysExists){
            const new_user = new UserClass();
            const response = await new_user.create_user(data);
            res.json(response);
        }else {
            throw new TypeError('all required keys must exist in payload');
        }

    } catch (err){
        if(err instanceof TypeError) {
            res.status(400).send({message:err.message});
        } else {
            res.send(err);
        }
    }
});

export default users;
