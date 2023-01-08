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
exports.UserClass = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserClass {
    list_users() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = 'SELECT * FROM users';
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not fetch users: ${err}`);
            }
        });
    }
    create_user(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const userExistsQuery = 'SELECT username FROM users WHERE LOWER(username) = $1';
                const userExists = yield conn.query(userExistsQuery, [user.username]);
                if (!userExists.rows.length) {
                    const query = 'INSERT INTO users(username,password,email,sex) VALUES(LOWER($1),$2,$3,$4) RETURNING *';
                    const { pepper, saltRounds } = process.env;
                    const salt = bcrypt_1.default.genSaltSync(Number(saltRounds));
                    const hashed_password = bcrypt_1.default.hashSync(user.password + pepper, salt);
                    const result = yield conn.query(query, [user.username, hashed_password, user.email, user.sex]);
                    conn.release();
                    return {
                        status: 200,
                        message: "Profile created successfully"
                    };
                }
                else {
                    conn.release();
                    return {
                        status: 400,
                        message: "Username exists already"
                    };
                }
            }
            catch (err) {
                throw new Error(`Could not create user: ${err}`);
            }
        });
    }
    authenticate_user(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = 'SELECT * FROM users WHERE LOWER(username) = $1';
                const result = yield conn.query(query, [username]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    return bcrypt_1.default.compareSync(password, user.password) ? user : "Password is incorrect";
                }
                return "User does not exist";
            }
            catch (err) {
                throw new Error(`Could not fetch user: ${err}`);
            }
        });
    }
}
exports.UserClass = UserClass;
