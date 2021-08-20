"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var BaseController_1 = __importDefault(require("./BaseController"));
var MineController = /** @class */ (function (_super) {
    __extends(MineController, _super);
    function MineController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MineController.prototype.mineBlock = function (_req, res) {
        var lastBlock = this.blockchain.lastBlock();
        var lastProof = lastBlock.proof;
        var proof = this.blockchain.proofOfWork(lastProof);
        this.blockchain.newTransaction("0", uuid_1.v4(), 1);
        var previousHash = this.blockchain.hash(lastBlock);
        var block = this.blockchain.newBlock(previousHash, proof);
        return res.status(201).json({
            message: "New block forged",
            index: block.index,
            transactions: block.transactions,
            proof: block.proof,
            previousHash: block.previousHash,
        });
    };
    return MineController;
}(BaseController_1.default));
exports.default = MineController;
