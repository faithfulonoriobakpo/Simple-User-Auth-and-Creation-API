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
exports.Cars = void 0;
const database_1 = __importDefault(require("../database"));
class Cars {
    get_all_cars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = 'SELECT * FROM cars';
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get cars: ${err}`);
            }
        });
    }
    get_car(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT * FROM cars WHERE LOWER(name) = LOWER($1)`;
                const result = yield conn.query(query, [name]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get car ${err}`);
            }
        });
    }
    add_car(name, brand, model, year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `INSERT INTO cars(name, brand, model, year) VALUES($1, $2, $3, $4)`;
                yield conn.query(query, [name, brand, model, year]);
                conn.release();
            }
            catch (err) {
                throw new Error(`Could not add car ${err}`);
            }
        });
    }
}
exports.Cars = Cars;
