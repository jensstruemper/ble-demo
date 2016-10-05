import { Component } from '@angular/core';
//import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { BLE } from 'ionic-native';
//import { ChartistComponent } from 'angular2-chartist';

@Component({
templateUrl: 'build/pages/devices/devices.html',
//selector: 'Devices'
})


export class DevicePage {

  private nav:NavController = null;
  private navParams:NavParams = null;
  private device:any;
  private connecting:any;
  private characteristics:any;
  private data:any;
  private temp:string = "Waiting for Data";

  static get parameters() {
    return [[NavParams],[NavController]];
    //return [[NavParams],[NavController],[ChangeDetectorRef]];
  }
  //  constructor(navParams, nav, private cd:ChangeDetectorRef) {
  constructor(navParams:NavParams, nav:NavController) {
    this.nav = nav;
    this.navParams = navParams;
    this.device = this.navParams.get('device');
    this.connect(this.device.id);
  }

  connect(device) {
  /*
    var service = "6e524635-312d-444b-2020-202020202020";
    var characteristic_read = "6e524635-312d-444b-2062-7574746f6e20";
    var characteristic_write = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
  */
    var bleUART = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
    var RXD = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
    var TXD = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
    //this.hello = "Hello";
    BLE.connect(device).subscribe(
      peripheralData => {
        console.log("Connect:" + JSON.stringify(peripheralData));
          BLE.startNotification(device, bleUART, RXD).subscribe(
            buffer => {this.temp = String.fromCharCode.apply(null, new Uint8Array(buffer));
          //     this.cd.detectChanges();
          //   {this.zone.run(()=>{this.temp = String.fromCharCode.apply(null, new Uint8Array(buffer))}
              console.log("Data: " + this.temp);
            },
            error => {console.log("Error Notification" + JSON.stringify(error))});
        },
        error => {console.log("Error Connecting" + JSON.stringify(error));})

    }

}
