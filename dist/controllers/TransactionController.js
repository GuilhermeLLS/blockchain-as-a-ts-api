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
var BaseController_1 = __importDefault(require("./BaseController"));
var TransactionController = /** @class */ (function (_super) {
    __extends(TransactionController, _super);
    function TransactionController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionController.prototype.newTransaction = function (req, res) {
        var _a = req.body, amount = _a.amount, receiver = _a.receiver, sender = _a.sender;
        var index = this.blockchain.newTransaction(sender, receiver, amount);
        return res.status(201).json({ message: "Transaction will be added to Block " + index });
    };
    return TransactionController;
}(BaseController_1.default));
exports.default = TransactionController;
