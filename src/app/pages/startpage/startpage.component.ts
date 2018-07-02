import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {LoadExcerpts, LoadAllProjects} from '../../store/ecocrowd-actions';
import * as ecocrowdReducers from '../../store/ecocrowd-reducer';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor( private store: Store<ecocrowdReducers.State>) {}

  ngOnInit() {
    //this.loadExcerpts(15);
    //this.loadAllProjects();
  }

  public loadExcerpts(max: number) {
    console.log("loadexcerpts")
    this.store.dispatch(new LoadExcerpts(max));
  }

}
