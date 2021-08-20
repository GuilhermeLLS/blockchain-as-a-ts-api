"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var App = /** @class */ (function () {
    function App() {
        this.server = express_1.default();
        this.logger();
        this.middlewares();
        this.routes();
    }
    App.prototype.logger = function () {
        this.server.use(morgan_1.default("[INFO] :method - :url - STATUS: :status - :response-time ms"));
    };
    App.prototype.middlewares = function () {
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
    };
    App.prototype.routes = function () {
        this.server.use(index_1.default);
    };
    return App;
}());
exports.default = new App().server;
