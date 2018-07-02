import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private swUpdate: SwUpdate) {
    if(environment.production){
    swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      if (confirm("New version available. Load New Version?")) {

        window.location.reload();
      }
      /* if (event) {
        swUpdate.activateUpdate().then(() => document.location.reload());
      } */
    });
    swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    this.swUpdate.checkForUpdate()
  }
}
}
