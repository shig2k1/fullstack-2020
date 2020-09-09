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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeaTrial = void 0;
var process_1 = __importDefault(require("process"));
var lodash_1 = __importDefault(require("lodash"));
var SeaTrialException_1 = require("./SeaTrialException");
var DefaultKubernetesClient_1 = require("./DefaultKubernetesClient");
var SeaTrial = /** @class */ (function () {
    function SeaTrial(configuration, kubernetesClient) {
        this._configuration = configuration;
        this._kubernetesClient = kubernetesClient;
    }
    Object.defineProperty(SeaTrial.prototype, "configuration", {
        get: function () {
            return __assign({}, this._configuration);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeaTrial.prototype, "kubernetesClient", {
        get: function () {
            return this._kubernetesClient;
        },
        enumerable: false,
        configurable: true
    });
    SeaTrial.loadConfigurationFromEnvironment = function () {
        var _a, _b;
        var clusterHostname = (_a = process_1.default.env.SEATRIAL_CLUSTER_HOSTNAME) !== null && _a !== void 0 ? _a : '';
        var kubernetesNamespace = (_b = process_1.default.env.SEATRIAL_NAMESPACE) !== null && _b !== void 0 ? _b : '';
        return { clusterHostname: clusterHostname, kubernetesNamespace: kubernetesNamespace };
    };
    SeaTrial.newSeaTrial = function () {
        var configFromEnv = SeaTrial.loadConfigurationFromEnvironment();
        if (lodash_1.default.isEmpty(configFromEnv.clusterHostname)) {
            throw new SeaTrialException_1.SeaTrialException('Configuration missing cluster hostname');
        }
        if (lodash_1.default.isEmpty(configFromEnv.kubernetesNamespace)) {
            throw new SeaTrialException_1.SeaTrialException('Configuration missing namespace');
        }
        return new SeaTrial(configFromEnv, new DefaultKubernetesClient_1.DefaultKubernetesClient(configFromEnv.kubernetesNamespace));
    };
    return SeaTrial;
}());
exports.SeaTrial = SeaTrial;
