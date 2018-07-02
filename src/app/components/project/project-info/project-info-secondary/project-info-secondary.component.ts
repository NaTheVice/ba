import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';



import { Project } from '../../../../models/projects';
import * as ecocrowdReducers from '../../../../store/ecocrowd-reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-project-info-secondary',
  templateUrl: './project-info-secondary.component.html',
  styleUrls: ['./project-info-secondary.component.scss']
})
export class ProjectInfoSecondaryComponent implements OnInit {

  public project$: Observable<Project>;
  public loading$: Observable<boolean>;

  constructor(private store: Store<ecocrowdReducers.State>) {
    this.project$ = store.select(ecocrowdReducers.getSelectedProjectState);
  }

  ngOnInit() {
  }

}
