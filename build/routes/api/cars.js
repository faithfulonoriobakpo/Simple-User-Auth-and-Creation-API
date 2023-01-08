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
const Car_1 = require("../../models/Car");
const cars = express_1.default.Router();
cars.get('/all-cars', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car_instance = new Car_1.Cars();
    const result = yield car_instance.get_all_cars();
    res.json(result);
}));
cars.get('/car/name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car_instance = new Car_1.Cars();
    const name = req.query.name;
    const result = yield car_instance.get_car(name);
    res.json(result);
}));
cars.post('/add-cars', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.cars.length >= 1) {
            const car_instance = new Car_1.Cars();
            const addedCars = req.body.cars;
            yield addedCars.forEach((car) => {
                const { name, brand, model, year } = car;
                if (name || brand) {
                    (() => __awaiter(void 0, void 0, void 0, function* () { return yield car_instance.add_car(name, brand, model, year); }))();
                }
                else {
                    throw new TypeError("car name and brand must be valid!");
                }
            });
            res.status(200).json({ status: "success", message: "cars successfully added!" });
        }
        else {
            throw new Error("Request json body must contain a car key of an array of cars");
        }
    }
    catch (err) {
        res.status(400).json({ error: `Could not add cars: ${err}` });
    }
}));
exports.default = cars;
