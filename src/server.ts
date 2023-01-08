import express from "express";
import routes from "./routes";

const port: number = 3000;

const app: express.Application = express();

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Express application started at ${port}`);
});
