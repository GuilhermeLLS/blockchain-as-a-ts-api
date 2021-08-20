import cors from "cors";
import morgan from "morgan";
import express, { Express as ExpressServerType } from "express";
import router from "./routes/index";

class App {
	server: ExpressServerType;
	constructor() {
		this.server = express();
		this.logger();
		this.middlewares();
		this.routes();
	}

	logger() {
		this.server.use(morgan("[INFO] :method - :url - STATUS: :status - :response-time ms"));
	}

	middlewares() {
		this.server.use(cors());
		this.server.use(express.json());
	}

	routes() {
		this.server.use(router);
	}
}

export default new App().server;
