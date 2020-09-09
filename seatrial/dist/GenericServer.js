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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericServer = void 0;
var SeaTrial_1 = require("./SeaTrial");
var randomstring_1 = __importDefault(require("randomstring"));
var SeaTrialException_1 = require("./SeaTrialException");
var SeaTrialUtils_1 = __importDefault(require("./SeaTrialUtils"));
var GenericServer = /** @class */ (function () {
    function GenericServer(params) {
        this.seaTrial = params.seaTrial || SeaTrial_1.SeaTrial.newSeaTrial();
        this.name = params.name;
        this.imageName = params.imageName;
        this.containerPort = params.containerPort;
        this.env = {};
        this.readinessProbes = [];
        this.id = randomstring_1.default.generate(7).toLocaleLowerCase();
        this.deploymentName = this.name + '-deployment-' + this.id;
        this.serviceName = this.name + '-service-' + this.id;
        this.label = this.name + '-' + SeaTrialUtils_1.default.generateUniqueLabel();
        this.servicePorts = {};
        this.imageTag = 'latest';
        this.imagePullPolicy = 'Always';
        this.command = null;
        this.memoryRequest = '512Mi';
        this.coresRequest = null;
        this.initialDelay = 1000;
        this.period = 1000;
        this.timeout = 30000;
    }
    GenericServer.prototype.withEnv = function (variable, value) {
        this.env[variable] = value;
        return this;
    };
    GenericServer.prototype.withReadinessProbe = function (readinessProbe) {
        this.readinessProbes.push(readinessProbe);
        return this;
    };
    GenericServer.prototype.withReadinessInitialDelay = function (initialDelay) {
        this.initialDelay = initialDelay;
        return this;
    };
    GenericServer.prototype.withReadinessPeriod = function (period) {
        this.period = period;
        return this;
    };
    GenericServer.prototype.withReadinessTimeout = function (timeout) {
        this.timeout = timeout;
        return this;
    };
    GenericServer.prototype.withCommand = function (command) {
        this.command = __spreadArrays(command);
        return this;
    };
    GenericServer.prototype.withImageTag = function (imageTag) {
        this.imageTag = imageTag;
        return this;
    };
    GenericServer.prototype.withImagePullPolicy = function (imagePullPolicy) {
        if (!imagePullPolicy) {
            throw new Error();
        }
        this.imagePullPolicy = imagePullPolicy;
        return this;
    };
    GenericServer.prototype.withMemoryRequest = function (memoryRequest) {
        if (!memoryRequest) {
            throw new Error();
        }
        this.memoryRequest = memoryRequest;
        return this;
    };
    GenericServer.prototype.withCoresRequest = function (coresRequest) {
        if (coresRequest < 0) {
            throw new Error();
        }
        this.coresRequest = coresRequest;
        return this;
    };
    GenericServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployment, service, createdService, _i, _a, servicePort, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        deployment = this.createDeploymentSpec();
                        return [4 /*yield*/, this.seaTrial.kubernetesClient.createDeployment(deployment)];
                    case 1:
                        _b.sent();
                        service = this.createServiceSpec();
                        return [4 /*yield*/, this.seaTrial.kubernetesClient.createService(service)];
                    case 2:
                        createdService = _b.sent();
                        for (_i = 0, _a = createdService.body.spec.ports; _i < _a.length; _i++) {
                            servicePort = _a[_i];
                            this.servicePorts[servicePort.name] = servicePort.nodePort;
                        }
                        return [4 /*yield*/, this.performReadinessChecks()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error(error_1);
                        throw new SeaTrialException_1.SeaTrialException('Could not start ' + this.name);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(GenericServer.prototype, "kuberenetesNamespace", {
        get: function () {
            return this.seaTrial.configuration.kubernetesNamespace;
        },
        enumerable: false,
        configurable: true
    });
    GenericServer.prototype.createDeploymentSpec = function () {
        var deployment = {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: {
                name: this.deploymentName,
                namespace: this.kuberenetesNamespace
            },
            spec: {
                selector: {
                    matchLabels: {
                        app: this.label
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: this.label
                        }
                    },
                    spec: {
                        containers: [
                            {
                                image: this.imageName + ":" + this.imageTag,
                                name: this.label,
                                ports: [
                                    {
                                        containerPort: this.containerPort,
                                        name: 'port',
                                        protocol: 'TCP'
                                    }
                                ],
                                imagePullPolicy: this.imagePullPolicy,
                                env: Object.entries(this.env).map(function (_a) {
                                    var key = _a[0], value = _a[1];
                                    return {
                                        name: key,
                                        value: value
                                    };
                                }),
                                resources: {
                                    requests: {
                                        memory: this.memoryRequest
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        };
        if (this.command !== null) {
            deployment.spec.template.spec.containers[0].command = this.command;
        }
        if (this.coresRequest !== null) {
            deployment.spec.template.spec.containers[0].resources.cpu = this.coresRequest * 1000 + "m";
        }
        return deployment;
    };
    GenericServer.prototype.createServiceSpec = function () {
        var service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: {
                name: this.serviceName,
                namespace: this.kuberenetesNamespace
            },
            spec: {
                type: 'NodePort',
                selector: {
                    app: this.label
                },
                ports: [
                    {
                        name: 'port',
                        port: this.containerPort,
                        protocol: 'TCP',
                        targetPort: 'port'
                    }
                ]
            }
        };
        return service;
    };
    GenericServer.prototype.getPort = function () {
        return this.servicePorts.port || 0;
    };
    GenericServer.prototype.getHostname = function () {
        return this.seaTrial.configuration.clusterHostname;
    };
    GenericServer.prototype.performReadinessChecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = this.readinessProbes.map(function (readinessProbe) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, readinessProbe.waitUntilReady(this.initialDelay, this.period, this.timeout)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GenericServer.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 4]);
                        return [4 /*yield*/, this.seaTrial.kubernetesClient.deleteDeployment(this.deploymentName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.seaTrial.kubernetesClient.deleteService(this.serviceName)];
                    case 3:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GenericServer;
}());
exports.GenericServer = GenericServer;
