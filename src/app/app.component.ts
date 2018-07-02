import { Component, OnInit } from '@angular/core';
import { WorkerService } from './services/worker.service';

import { Store } from '@ngrx/store';
import {LoadExcerpts, LoadAllProjects} from './store/ecocrowd-actions';
import * as ecocrowdReducers from './store/ecocrowd-reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private store: Store<ecocrowdReducers.State>, private swupdate: WorkerService) {}

  ngOnInit() {
    this.loadExcerpts(15);
    //this.loadAllProjects();
  }

  public loadExcerpts(max: number) {
    console.log("loadexcerpts")
    this.store.dispatch(new LoadExcerpts(max));
  }
  public loadAllProjects() {
    this.store.dispatch(new LoadAllProjects());
  }




}
