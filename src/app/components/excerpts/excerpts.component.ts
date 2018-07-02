import { Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';

import { ExcerptsList } from '../../models/excerpts';
import * as ecocrowdReducers from '../../store/ecocrowd-reducer';
import { Store } from '@ngrx/store';
import { LoadExcerpts, SelectProject } from '../../store/ecocrowd-actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-excerpts',
  templateUrl: './excerpts.component.html',
  styleUrls: ['./excerpts.component.scss']
})
export class ExcerptsComponent {
  public excerpts$: Observable<ExcerptsList>;
  public loading$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<ecocrowdReducers.State>) 
    {
    this.excerpts$ = store.select(ecocrowdReducers.getExcerptsListState);
    this.loading$ = store.select(ecocrowdReducers.getExcerptsLoading);
    }

  public selectProject(projectId: number, projectSlug: string): void {
    if (projectId) {
      this.router.navigate(['projekt', projectId, projectSlug]);
    }
  }
}
