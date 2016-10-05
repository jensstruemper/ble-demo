import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DevicePage } from '../devices/devices';
import { BLE } from 'ionic-native';

@Component({templateUrl: 'home.html'})

export class HomePage {
  private nav:NavController = null; // please add this line as default generated page plus the --ts option on command line.
  public devices:any;
  public isScanning:any;

  static get parameters() {
    return [[NavController]];
  }

  constructor(nav:NavController) {
    this.nav = nav;
    this.devices = [];
    this.isScanning = false;
  }

  startScanning() {
    console.log('Scanning Started');
    this.devices = [];
    this.isScanning = true;
    BLE.startScan([]).subscribe(device => {
    this.devices.push(device);
    });

    setTimeout(() => {
    BLE.stopScan().then(() => {
      console.log('Scanning has stopped');
      console.log(JSON.stringify(this.devices))
      this.isScanning = false;
    });
    }, 5000);
  }

  connectToDevice(device) {
    console.log('Connect To Device');
    console.log(JSON.stringify(device))
    this.nav.push(DevicePage, {
    device: device
  });
}
}
