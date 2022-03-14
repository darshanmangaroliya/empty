import "reflect-metadata"
import express from "express";

import { createConnection } from "typeorm";
import { Todo } from "./Entity/todo";
import cors from 'cors'
import todoRouter from './routes/todoRoutes'


const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: "password",
			database: 'typeorm',
			entities: [Todo],
			 synchronize: true,
		});
		console.log('Connected to mysql');

		
		app.listen(8080, () => {
			console.log('Now running on port 8080');
		});
	} catch (error) {
		console.error("error:",error);
		throw new Error('Unable to connect to db');
	}
};

main();

app.use(express.json());

		 app.use(cors());
		app.use(express.json());
		// app.use(morgan('dev'));
		
		// routes
		app.use(todoRouter);
