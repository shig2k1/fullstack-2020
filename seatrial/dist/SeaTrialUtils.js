"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var randomstring_1 = __importDefault(require("randomstring"));
function generateUniqueLabel() {
    return randomstring_1.default.generate({
        length: 16,
        charset: 'abcdefghijklmnopqrstuvwxyz0123456899'
    });
}
exports.default = { generateUniqueLabel: generateUniqueLabel };
