import {Component, OnInit} from '@angular/core';
import * as decode  from 'jwt-decode';

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
      this.setToken()
  }
  setToken(){
    let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnsiYXV0aG9yaXphdGlvbiI6eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciJdfX19.4IKFHH33EXWseNjNIRO4-u5IlSlJOLyibG20qPA4Djs.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
  localStorage.setItem('token',jwt)
  let jwtData = localStorage.getItem('token').split('.')[1]
  let decodedJwtJsonData = window.atob(jwtData)
  let decodedJwtData = JSON.parse(decodedJwtJsonData)
  
 
  const tokenPayload = decode(localStorage.getItem('token'));
  console.log('jwtData: ' + tokenPayload)
  console.log('jwtData: ' + jwtData)
  console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
  console.log('decodedJwtData: ' + decodedJwtData)
  console.log('Is admin: ' + decodedJwtData.app_metadata.authorization.roles)
  
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }  

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}