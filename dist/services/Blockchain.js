"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = new Array();
        this.nodes = new Set();
        this.currentTransactions = new Array();
        this.newBlock("1", 100);
    }
    Object.defineProperty(Blockchain.prototype, "Nodes", {
        get: function () {
            return this.nodes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Blockchain.prototype, "Chain", {
        get: function () {
            return this.chain;
        },
        enumerable: false,
        configurable: true
    });
    Blockchain.prototype.newBlock = function (previousHash, proof) {
        var block = {
            index: this.chain.length - 1,
            timestamp: Date.now(),
            transactions: this.currentTransactions,
            proof: proof,
            previousHash: previousHash,
        };
        this.currentTransactions = [];
        this.chain.push(block);
        return block;
    };
    Blockchain.prototype.registerNode = function (address) {
        this.nodes.add(new URL(address).hostname);
    };
    Blockchain.prototype.hash = function (block) {
        var blockString = JSON.stringify(block, Object.keys(block).sort());
        return sha256_1.default(blockString).toString();
    };
    Blockchain.prototype.lastBlock = function () {
        return this.chain.slice(-1)[0];
    };
    Blockchain.prototype.newTransaction = function (sender, receiver, amount) {
        this.currentTransactions.push({ sender: sender, receiver: receiver, amount: amount });
        return this.lastBlock().index + 1;
    };
    Blockchain.prototype.proofOfWork = function (lastProof) {
        var proof = 0;
        while (!this.isProofValid(lastProof, proof))
            proof++;
        return proof;
    };
    Blockchain.prototype.isProofValid = function (lastProof, proof) {
        var guess = encodeURI(String(lastProof + proof));
        return sha256_1.default(guess).toString().slice(-4).endsWith("0000");
    };
    Blockchain.prototype.isChainValid = function (chain) {
        var lastBlock = chain[0];
        var currentIndex = 1;
        while (currentIndex < chain.length) {
            var block = chain[currentIndex];
            if (block.previousHash !== this.hash(lastBlock)) {
                return false;
            }
            if (!this.isProofValid(lastBlock.proof, block.proof)) {
                return false;
            }
            lastBlock = block;
            currentIndex++;
        }
        return true;
    };
    Blockchain.prototype.resolveConflicts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var neighbors, newChain, maxLen;
            var _this = this;
            return __generator(this, function (_a) {
                neighbors = this.nodes;
                newChain = [];
                maxLen = this.chain.length;
                neighbors.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, responseStatus, responseJson, _b, length_1, chain;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fetch("http://" + node + "/chain")];
                            case 1:
                                _a = _c.sent(), responseStatus = _a.status, responseJson = _a.json;
                                if (!(responseStatus === 200)) return [3 /*break*/, 3];
                                return [4 /*yield*/, responseJson()];
                            case 2:
                                _b = _c.sent(), length_1 = _b.length, chain = _b.chain;
                                if (length_1 > maxLen && this.isChainValid(chain)) {
                                    maxLen = length_1;
                                    newChain = chain;
                                }
                                _c.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                if (newChain.length > 0) {
                    this.chain = newChain;
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        });
    };
    return Blockchain;
}());
exports.default = Blockchain;
