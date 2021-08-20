"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MineController_1 = __importDefault(require("../controllers/MineController"));
var NodeController_1 = __importDefault(require("../controllers/NodeController"));
var ChainController_1 = __importDefault(require("../controllers/ChainController"));
var TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
var router = express_1.Router();
router.get("/", function (_req, res) { return res.status(200).json({ message: "api is running" }); });
router.get("/mine", new MineController_1.default().mineBlock);
router.get("/chain", new ChainController_1.default().getChain);
router.get("/nodes/resolve", new NodeController_1.default().resolveNodes);
router.get("/nodes/register", new NodeController_1.default().registerNodes);
router.post("/transactions/new", new TransactionController_1.default().newTransaction);
exports.default = router;
