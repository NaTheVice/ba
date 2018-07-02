import { Component, OnInit } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';


import { Project } from '../../models/projects';
import * as ecocrowdReducers from '../../store/ecocrowd-reducer';
import { Store } from '@ngrx/store';

import {LoadExcerpts, SelectProject, LoadComments} from '../../store/ecocrowd-actions';
import * as router from '../../store/router-reducer';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public project$: Observable<Project>;
  public loading$: Observable<boolean>;
  public projectId;

  constructor(private store: Store<ecocrowdReducers.State>, private routerState: Store<router.State> ) {

    this.project$ = store.select(ecocrowdReducers.getSelectedProjectState);
    this.loading$ = store.select(ecocrowdReducers.getProjectSelecting);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.routerState.select(router.getRouterState).subscribe(r => {
      this.projectId = r.state.params.id;
    });
    this.store.dispatch(new SelectProject(this.projectId));
    this.store.dispatch(new LoadComments(this.projectId))
    
  }

}
