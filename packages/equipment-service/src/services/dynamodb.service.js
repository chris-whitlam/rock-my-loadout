"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.DynamoDBService = void 0;
var common_1 = require("@nestjs/common");
var aws_sdk_1 = require("aws-sdk");
var uuid_1 = require("uuid");
var DynamoDBService = /** @class */ (function () {
    function DynamoDBService() {
        this.client = new aws_sdk_1.DynamoDB.DocumentClient({
            endpoint: process.env.DYNAMODB_ENDPOINT
        });
    }
    DynamoDBService.prototype.getLoadoutByUUID = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var Item, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client
                                .get({
                                TableName: 'loadouts',
                                Key: { uuid: uuid }
                            })
                                .promise()];
                    case 1:
                        Item = (_a.sent()).Item;
                        return [2 /*return*/, Item];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        throw new common_1.NotFoundException(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DynamoDBService.prototype.saveLoadout = function (loadout) {
        return __awaiter(this, void 0, void 0, function () {
            var loadoutObject, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loadoutObject = __assign(__assign({}, loadout), { uuid: (0, uuid_1.v4)(), createdAt: new Date().toISOString() });
                        return [4 /*yield*/, this.client
                                .put({
                                TableName: 'loadouts',
                                Item: loadoutObject
                            })
                                .promise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { uuid: loadoutObject.uuid }];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        throw new common_1.InternalServerErrorException(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DynamoDBService = __decorate([
        (0, common_1.Injectable)()
    ], DynamoDBService);
    return DynamoDBService;
}());
exports.DynamoDBService = DynamoDBService;