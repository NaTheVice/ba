import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/projects';
import * as ecocrowdReducers from '../../../store/ecocrowd-reducer';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { LoadComments } from '../../../store/ecocrowd-actions';
import { CommentsList } from '../../../models/comments';

@Component({
  selector: 'app-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.scss']
})
export class ProjectCommentsComponent implements OnInit {
  public comments$: Observable<CommentsList>;
  public loading$: Observable<boolean>;


  constructor(private store: Store<ecocrowdReducers.State>) {
    this.comments$ = store.select(ecocrowdReducers.getCommentsState);
    this.loading$ = store.select(ecocrowdReducers.getCommentsLoading);
  }

  ngOnInit() { }

  private changeDate(date: string) {
    const commentDate = new Date(date)
    const jetzt = new Date();
    const differenzTage = Math.round((commentDate.getTime() - jetzt.getTime()) / (1000 * 60 * 60 * 24));
    let dateString = "";

    if (differenzTage < 0) {
      dateString = "vor " + (-1) * differenzTage + " Tagen";
      if (differenzTage == -1) {
      dateString = "gestern " + commentDate.getHours() + ':' + String(commentDate.getMinutes()).padStart(2, "0") + ' Uhr';
      }
    }
    else {
      dateString = "heute " + commentDate.getHours() + ':' + String(commentDate.getMinutes()).padStart(2, "0") + ' Uhr';
    }
    return dateString;
  }



}
