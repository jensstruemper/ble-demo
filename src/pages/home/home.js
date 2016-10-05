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
var devices_1 = require('../devices/devices');
var ionic_native_1 = require('ionic-native');
var HomePage = (function () {
    function HomePage(nav) {
        this.nav = null;
        this.nav = nav;
        this.devices = [];
        this.isScanning = false;
    }
    Object.defineProperty(HomePage, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController]];
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.startScanning = function () {
        var _this = this;
        console.log('Scanning Started');
        this.devices = [];
        this.isScanning = true;
        ionic_native_1.BLE.startScan([]).subscribe(function (device) {
            _this.devices.push(device);
        });
        setTimeout(function () {
            ionic_native_1.BLE.stopScan().then(function () {
                console.log('Scanning has stopped');
                console.log(JSON.stringify(_this.devices));
                _this.isScanning = false;
            });
        }, 5000);
    };
    HomePage.prototype.connectToDevice = function (device) {
        console.log('Connect To Device');
        console.log(JSON.stringify(device));
        this.nav.push(devices_1.DevicePage, {
            device: device
        });
    };
    HomePage = __decorate([
        core_1.Component({ templateUrl: 'build/pages/home/home.html' }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ionic_angular_1.NavController !== 'undefined' && ionic_angular_1.NavController) === 'function' && _a) || Object])
    ], HomePage);
    return HomePage;
    var _a;
}());
exports.HomePage = HomePage;
