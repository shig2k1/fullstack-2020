"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.WPSHubServer = void 0;
var GenericServer_1 = require("./GenericServer");
var randomstring_1 = __importDefault(require("randomstring"));
var HttpReadinessProbe_1 = require("./readiness/HttpReadinessProbe");
var WPSHUB_DOCKER_IMAGE = 'docker.worldprogramming.com/wpshub';
var INSTALLROOT = '/opt/worldprogramming/wpshub-4';
var DEFAULT_PORT = 8181;
var HUBADMINISTRATOR_USERNAME = 'HubAdministrator';
var HUBADMINISTRATOR_PASSWORD = 'password';
var WPSHubServer = /** @class */ (function (_super) {
    __extends(WPSHubServer, _super);
    function WPSHubServer(licenceKey) {
        var _this = _super.call(this, {
            name: 'wpshub',
            imageName: WPSHUB_DOCKER_IMAGE,
            containerPort: DEFAULT_PORT
        }) || this;
        _this.configuration = {};
        _this.configuration['bootstrap.adminPassword'] = HUBADMINISTRATOR_PASSWORD;
        _this.configuration['ondemandmonitor.monitorFrequency'] = '1';
        _this.configuration['ondemandmonitor.connectionTimeout'] = '1';
        _this.withEnv('WPSHUB_DATABASE_TYPE', 'internal');
        _this.withEnv('WPSHUB_DATABASE_MEMORYKEY', randomstring_1.default.generate(16));
        _this.withEnv('WPSHUB_LICENCE_KEY', licenceKey);
        _this.withCoresRequest(0.5);
        _this.withMemoryRequest('2Gi');
        _this.withCommand(['/bin/sh', '-c', INSTALLROOT + "/bin/wpshub bootstrap && " + INSTALLROOT + "/bin/wpshub"]);
        var readinessProbe = new HttpReadinessProbe_1.HttpReadinessProbe({
            urlSupplier: function () { return _this.getURL(); },
            auth: {
                username: HUBADMINISTRATOR_USERNAME,
                password: HUBADMINISTRATOR_PASSWORD
            }
        });
        _this.withReadinessProbe(readinessProbe);
        _this.withCoresRequest(0.5);
        _this.withMemoryRequest('2Gi');
        _this.withReadinessTimeout(60000);
        return _this;
    }
    WPSHubServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var javaOpts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        javaOpts = '';
                        Object.entries(this.configuration).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            javaOpts = javaOpts + " -Dwpshub." + key + "=" + value;
                        });
                        this.withEnv('JAVA_OPTS', javaOpts);
                        return [4 /*yield*/, _super.prototype.start.call(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WPSHubServer.prototype.withConfigurationOption = function (moduleName, optionName, optionValue) {
        this.configuration[moduleName + "." + optionName] = optionValue;
        return this;
    };
    WPSHubServer.prototype.getHubAdministratorUsername = function () {
        return HUBADMINISTRATOR_USERNAME;
    };
    WPSHubServer.prototype.getHubAdministratorPassword = function () {
        return HUBADMINISTRATOR_PASSWORD;
    };
    WPSHubServer.prototype.getURL = function () {
        return "http://" + this.getHostname() + ":" + this.getPort();
    };
    return WPSHubServer;
}(GenericServer_1.GenericServer));
exports.WPSHubServer = WPSHubServer;
