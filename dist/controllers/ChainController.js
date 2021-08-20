"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Blockchain_1 = __importDefault(require("../services/Blockchain"));
var ChainController = /** @class */ (function () {
    function ChainController() {
        this.__blockchain = new Blockchain_1.default();
    }
    ChainController.prototype.getChain = function (_req, res) {
        console.log(this, 'here');
        var chain = this.__blockchain.Chain;
        return res.status(200).json({ chain: chain, length: chain.length });
    };
    return ChainController;
}());
exports.default = ChainController;
