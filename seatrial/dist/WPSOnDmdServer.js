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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WPSOnDemandServer = void 0;
var GenericServer_1 = require("./GenericServer");
var HttpReadinessProbe_1 = require("./readiness/HttpReadinessProbe");
var DEFAULT_PORT = 5555;
var WPSOnDemandServer = /** @class */ (function (_super) {
    __extends(WPSOnDemandServer, _super);
    function WPSOnDemandServer(licenceKeyBase64) {
        var _this = _super.call(this, {
            name: 'wpsondmd',
            imageName: 'docker.worldprogramming.com/wpsondmd',
            containerPort: DEFAULT_PORT
        }) || this;
        _this.withEnv('WPS_LICENCE', licenceKeyBase64);
        var readinessProbe = new HttpReadinessProbe_1.HttpReadinessProbe({
            urlSupplier: function () { return _this.getURL() + "/config"; }
        });
        _this.withReadinessProbe(readinessProbe);
        _this.withCoresRequest(0.1);
        _this.withMemoryRequest('512Mi');
        _this.withReadinessTimeout(120000);
        return _this;
    }
    WPSOnDemandServer.prototype.getURL = function () {
        return "http://" + this.getHostname() + ":" + this.getPort();
    };
    return WPSOnDemandServer;
}(GenericServer_1.GenericServer));
exports.WPSOnDemandServer = WPSOnDemandServer;
