"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Blockchain_1 = __importDefault(require("../services/Blockchain"));
var BaseController = /** @class */ (function () {
    function BaseController() {
        this.blockchainAsService = new Blockchain_1.default();
    }
    Object.defineProperty(BaseController.prototype, "blockchain", {
        get: function () {
            return this.blockchainAsService;
        },
        enumerable: false,
        configurable: true
    });
    return BaseController;
}());
exports.default = BaseController;
