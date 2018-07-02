import { Router } from "@angular/router/router";

import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable, defer, of } from "rxjs";

import { Store } from "@ngrx/store";
import * as ecocrowdReducers from "../store/ecocrowd-reducer";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { Merchant } from "../models/merchant";
import * as ecocrowdActions from "./ecocrowd-actions";

import {
  LoadingExcerptsSuccess,
  LoadingExcerptsFails,
  LoadExcerpts,
  LoadingProjectSuccess,
  LoadingProjectFails,
  LoadProject,
  LoadingAllProjectsSuccess,
  LoadingAllProjectsFails,
  LoadAllProjects,
  SelectProject,
  SelectProjectSuccess,
  SelectProjectFails,
  SelectProjectFromApi,
  LoadComments,
  LoadingCommentsSuccess,
  LoadingCommentsFails
} from "./ecocrowd-actions";

import { ProjectsService } from "../services/projects.service";
import { ProjectsList, Project, ApolloProject } from "../models/projects";
import { ExcerptsList } from "../models/excerpts";

@Injectable()
export class EcocrowdEffects {
  constructor(
    private projectsService: ProjectsService,
    private actions$: Actions,
    private store: Store<ecocrowdReducers.State>
  ) { }

  @Effect()
  loadExcerpts$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.LOAD_EXCERPTS)
    .pipe(
      tap(e => console.log("load effekt:", e)),
      map((action: LoadExcerpts) => action.payload),
      switchMap((max: number) =>
        this.projectsService.getExcerpts(max).pipe(
          map((response) => {
            console.log("data:", response.data.excerptsList)
            return new LoadingExcerptsSuccess(response.data.excerptsList);
          }),
          catchError(err => of(new LoadingExcerptsFails(err)))
        )
      )
    );

  @Effect()
  getProjectsOfExcerpts$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.LOADING_EXCERPTS_SUCCESS)
    .pipe(
      map((action: LoadingExcerptsSuccess) => action.payload),
      switchMap((excerptList: ExcerptsList) =>
        this.projectsService.getProjectsOfExerpts(excerptList).pipe(
          map((projectsList: ProjectsList) => {
            console.log("projectList in effect: ", projectsList)
            return new LoadingAllProjectsSuccess(projectsList);
          }),
          catchError(err => of(new LoadingAllProjectsFails(err)))
        )
      )
    );

  @Effect()
  loadProject$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.LOAD_PROJECT)
    .pipe(
      map((action: LoadProject) => action.payload),
      switchMap((projectId: number) =>
        this.projectsService.getProject(projectId).pipe(
          map((response) => {
            return new LoadingProjectSuccess(response.data.project);
          }),
          catchError(err => of(new LoadingProjectFails(err)))
        )
      )
    );

  @Effect()
  selectProject$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.SELECT_PROJECT)
    .pipe(
      map((action: SelectProject) => action.payload),
      switchMap(projectId =>
        this.projectsService.getProjectFromProjectsList(projectId).pipe(
          map((projectToSelect) => {
            if (projectToSelect) {
              return new SelectProjectSuccess(projectToSelect);
            }
            return new SelectProjectFromApi(projectId)
          })
        )
      )
    );

  @Effect()
  loadProjectComments$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.LOAD_COMMENTS)
    .pipe(
      map((action: LoadComments) => action.payload),
      switchMap(projectId =>
        this.projectsService.getProjectComments(projectId).pipe(
          map((comments) => {
            if (comments) {
              let hashTable = Object.create(null)
              comments.forEach((comment) => hashTable[comment.id] = { ...comment, childNodes: [] })
              let commentsSorted = []
              comments.forEach((comment) => {
                if (comment.parent) 
                hashTable[comment.parent].childNodes.push(hashTable[comment.id])
                else 
                commentsSorted.push(hashTable[comment.id])
              })
              console.log("dataTree:", commentsSorted)
              return new LoadingCommentsSuccess(commentsSorted);
            }
          }),
          catchError(err => of(new LoadingCommentsFails(err)))
        )
      )
    );

  @Effect()
  selectProjectFromApi$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.SELECT_PROJECT_FROM_API)
    .pipe(
      map((action: SelectProjectFromApi) => action.payload),
      switchMap((projectId: number) =>
        this.projectsService.getProject(projectId).pipe(
          map((response) => {
            return new SelectProjectSuccess(response.data.project);
          }),
          catchError(err => {
            console.log("[Effect Error] : no Project found...");
            return of(new SelectProjectFails(err));
          })
        )
      )
    );

  /*   @Effect()
  loadAllProjects$: Observable<Action> = this.actions$
    .ofType(ecocrowdActions.LOAD_ALL_PROJECTS)
    .switchMap((action: LoadAllProjects) => {
      return this.projectsService
        .getAllProjects()
        .map(({ data }) => {
          console.log('data from load all projects effect', data);
          return new LoadingAllProjectsSuccess(data.allProjects);
        })
        .catch(error => {
          console.log('error in load-allProjects-effect' + error);
          return of(new LoadingProjectFails(error));
        });
    }); */
}
