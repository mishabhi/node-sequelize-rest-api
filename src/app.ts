import express, { Application } from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import "reflect-metadata";
import { useExpressServer, Delete } from "routing-controllers";
import { ProjectController } from "./controller/project.controller";
import { CorsOptions } from 'cors';
import cors from 'cors';


export class App {

    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.use(bodyParser.json());
    }

    middlewares() {
        useExpressServer(this.app, { // register created express server in routing-controllers
            controllers: [ProjectController] // and configure it the way you need (controllers, validation, etc.)
        });
        this.app.use(morgan('dev'));

        this.app.use(cors(
            {
                origin: 'http://localhost:4200',
                optionsSuccessStatus: 200,
                allowedHeaders:['Content-Type'],
                methods:['PUT', 'GET', 'POST', 'DELETE']
            }
        ));
        /*
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin");
            //res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            //res.header('Allow', 'GET, POST, PUT, DELETE');
            next();
        });*/
    }

    async listen() {
        this.app.listen(this.app.get('port'));
        console.log('Server started on port ' + this.app.get('port'))
    }
}
