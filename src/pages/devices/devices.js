"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var DevicePage = (function () {
    function DevicePage(navParams, nav, cd) {
        this.cd = cd;
        this.nav = null;
        this.navParams = null;
        this.temp = "Waiting for Data";
        this.nav = nav;
        this.navParams = navParams;
        this.device = this.navParams.get('device');
        this.connect(this.device.id);
    }
    Object.defineProperty(DevicePage, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavParams], [ionic_angular_1.NavController], [core_1.ChangeDetectorRef]];
        },
        enumerable: true,
        configurable: true
    });
    DevicePage.prototype.connect = function (device) {
        var _this = this;
        var bleUART = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
        var RXD = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
        var TXD = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
        ionic_native_1.BLE.connect(device).subscribe(function (peripheralData) {
            console.log("Connect:" + JSON.stringify(peripheralData));
            ionic_native_1.BLE.startNotification(device, bleUART, RXD).subscribe(function (buffer) {
                _this.temp = String.fromCharCode.apply(null, new Uint8Array(buffer));
                _this.cd.detectChanges();
                console.log("Data: " + _this.temp);
            }, function (error) { console.log("Error Notification" + JSON.stringify(error)); });
        }, function (error) { console.log("Error Connecting" + JSON.stringify(error)); });
    };
    DevicePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/devices/devices.html',
        }), 
        __metadata('design:paramtypes', [Object, Object, (typeof (_a = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _a) || Object])
    ], DevicePage);
    return DevicePage;
    var _a;
}());
exports.DevicePage = DevicePage;
