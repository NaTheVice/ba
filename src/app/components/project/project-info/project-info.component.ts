import { Component, OnInit } from '@angular/core';
import { sustain_categories } from '../../../models/sustains';
import { Subscription ,  Observable } from 'rxjs';


import { Project } from '../../../models/projects';
import * as ecocrowdReducers from '../../../store/ecocrowd-reducer';
import { Store } from '@ngrx/store';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  expandedInfo: boolean;
  expandedDesc: boolean;
  expandedMoney: boolean;
  expandedWho: boolean;
  expandedEco: boolean;
  expandedFuture: boolean;
  expandedRec: boolean;
  expandedMer: boolean;

  sustainCat: Array<string>;
  public project$: Observable<Project>;
  public loading$: Observable<boolean>;

  public count: number;

  constructor(
    private store: Store<ecocrowdReducers.State>,
    private sanitizer: DomSanitizer
  ) {
    this.expandedInfo = false;
    this.expandedDesc = false;
    this.expandedMoney = false;
    this.expandedWho = false;
    this.expandedEco = false;
    this.expandedFuture = false;
    this.expandedRec = false;
    this.expandedMer = false;
    this.count = 0;

    this.sustainCat = sustain_categories;
    this.project$ = store.select(ecocrowdReducers.getSelectedProjectState);
  }

  ngOnInit() {
  }


  public stylish(project, goal, i) {
    const c_value = project.funded_current_value;
    const re_goals = project.goals.slice().reverse();
    let percent_filled = 0;

    if (i < re_goals.length - 1) {
      if (c_value <= goal.amount && c_value <= re_goals[i + 1].amount) {
        return {
          background: `#ddd`
        };
      }
      if (c_value < goal.amount) {
        percent_filled = (c_value - re_goals[i + 1].amount) * 100 / (goal.amount - re_goals[i + 1].amount);
        return  {
          background: `-webkit-linear-gradient(90deg,#8ebf48 0%, #8ebf48 ${percent_filled}%, #ddd ${percent_filled}%)`
        };
      }
    }
    percent_filled = c_value / goal.amount * 100;
    return {
      background: `-webkit-linear-gradient(90deg,#8ebf48 0%, #8ebf48 ${percent_filled}%, #ddd ${percent_filled}%)`
    };
  }
}
