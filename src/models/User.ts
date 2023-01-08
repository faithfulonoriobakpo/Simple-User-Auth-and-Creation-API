import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
    id?: number,
    username: string,
    password: string,
    email: string,
    sex: string
}

export class Users {

    public async list_users(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const query = 'SELECT * FROM users'
            const result = await conn.query(query);
            conn.release();
            return result.rows;

        } catch (err){
            throw new Error(`Could not fetch users: ${err}`);
        }
    }

    public async create_user(user: User): Promise<User | string> {
        try {

            const conn = await Client.connect();
            const userExistsQuery = 'SELECT username FROM users WHERE LOWER(username) = $1';
            const userExists = await conn.query(userExistsQuery, [user.username]);

            if(!userExists.rows.length){
                const query = 'INSERT INTO users(username,password,email,sex) VALUES(LOWER($1),$2,$3,$4) RETURNING *';

                const {pepper, saltRounds} = process.env;
                const salt = bcrypt.genSaltSync(Number(saltRounds));

                const hashed_password = bcrypt.hashSync(user.password + pepper, salt);

                const result = await conn.query(query, [user.username, hashed_password, user.email, user.sex]);
                conn.release();
                return result.rows[0];

            }else{
                conn.release();
                return "Username already exists";
            }

        } catch(err) {
            throw new Error(`Could not create user: ${err}`);
        }
        
    }

    public async authenticate_user(username:string, password:string): Promise<User | string> {
        try {
            const conn = await Client.connect();
            const query = 'SELECT * FROM users WHERE LOWER(username) = $1';
            const result = await conn.query(query, [username]);
            conn.release();
            if(result.rows.length){
                const user = result.rows[0];
                return bcrypt.compareSync(password, user.password)? user : "Password is incorrect";
            }
            return "User does not exist";

        } catch(err){
            throw new Error(`Could not fetch user: ${err}`);
        }
    }
}
