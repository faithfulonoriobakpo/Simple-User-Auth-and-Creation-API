import express, {Request, Response} from "express";
import { type } from "os";
import { User, UserClass } from "../../models/User";
const users = express.Router();

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

users.post('/signup', async (req:Request, res:Response) => {
    const data = req.body;
    try {
        const new_user = new UserClass();
        const response = await new_user.create_user(data);
        res.json(response);
    } catch (err){
        res.send(err);
    }
});

export default users;
