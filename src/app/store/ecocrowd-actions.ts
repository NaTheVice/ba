import { Action } from '@ngrx/store';
import { Excerpt, ExcerptsList } from '../models/excerpts';
import { Project, ProjectsList } from '../models/projects';
import { CommentsList } from '../models/comments';
import { Merchant } from '../models/merchant';


export const SET_PAGE = 'PAGE';
export const LOAD_EXCERPTS = 'LOAD_EXCERPTS';
export const LOADING_EXCERPTS_SUCCESS = 'LOADING_EXCERPTS_SUCCESS';
export const LOADING_EXCERPTS_FAILS = 'LOADING_EXCERPTS_FAILS';

export const LOAD_PROJECT = 'LOAD_PROJECT';
export const LOADING_PROJECT_SUCCESS = 'LOADING_PROJECT_SUCCESS';
export const LOADING_PROJECT_FAILS = 'LOADING_PROJECT_FAILS';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOADING_COMMENTS_SUCCESS = 'LOADING_COMMENTS_SUCCESS';
export const LOADING_COMMENTS_FAILS = 'LOADING_COMMENTS_FAILS';

export const LOAD_ALL_PROJECTS = 'LOAD_ALL_PROJECTS';
export const LOADING_ALL_PROJECTS_SUCCESS = 'LOADING_ALL_PROJECTS_SUCCESS';
export const LOADING_ALL_PROJECTS_FAILS = 'LOADING_ALL_PROJECTS_FAILS';

export const SELECT_PROJECT = 'SELECT_PROJECT';
export const SELECT_PROJECT_FAILS = 'SELECT_PROJECT_FAILS';
export const SELECT_PROJECT_SUCCESS = 'SELECT_PROJECT_SUCCESS';
export const SELECT_PROJECT_FROM_API = 'SELECT_PROJECT_FROM_API';


export class SetPage implements Action {
  readonly type = SET_PAGE;
  constructor(public payload: number) {}
}

export class LoadExcerpts implements Action {
    readonly type = LOAD_EXCERPTS;
    constructor(public payload: number) {}
  }

export class LoadingExcerptsSuccess implements Action {
  readonly type = LOADING_EXCERPTS_SUCCESS;
  constructor(public payload: ExcerptsList) {
    console.log("excerpts: ", payload)
  }
}

export class LoadingExcerptsFails implements Action {
  readonly type = LOADING_EXCERPTS_FAILS;
  constructor(public payload: ExcerptsList) {
    console.log("fails lading")
  }
}





export class LoadProject implements Action {
  readonly type = LOAD_PROJECT;
  constructor(public payload: number) {}
}

export class LoadingProjectSuccess implements Action {
  readonly type = LOADING_PROJECT_SUCCESS;
  constructor(public payload: Project) {}
}

export class LoadingProjectFails implements Action {
  readonly type = LOADING_PROJECT_FAILS;
  constructor(public payload: Project) {}
}





export class LoadComments implements Action {
  readonly type = LOAD_COMMENTS;
  constructor(public payload: number) {}
}

export class LoadingCommentsSuccess implements Action {
  readonly type = LOADING_COMMENTS_SUCCESS;
  constructor(public payload: CommentsList) {}
}

export class LoadingCommentsFails implements Action {
  readonly type = LOADING_COMMENTS_FAILS;
  constructor(public payload: CommentsList) {}
}





export class LoadAllProjects implements Action {
  readonly type = LOAD_ALL_PROJECTS;
  constructor() {}
}

export class LoadingAllProjectsSuccess implements Action {
  readonly type = LOADING_ALL_PROJECTS_SUCCESS;
  constructor(public payload: ProjectsList) {}
}

export class LoadingAllProjectsFails implements Action {
  readonly type = LOADING_ALL_PROJECTS_FAILS;
  constructor(public payload: ProjectsList) {}
}




export class SelectProject implements Action {
  readonly type = SELECT_PROJECT;
  constructor(public payload: number) {}
}
export class SelectProjectSuccess implements Action {
  readonly type = SELECT_PROJECT_SUCCESS;
  constructor(public payload: Project) {}
}
export class SelectProjectFails implements Action {
  readonly type = SELECT_PROJECT_FAILS;
  constructor(public payload: number) {}
}
export class SelectProjectFromApi implements Action {
  readonly type = SELECT_PROJECT_FROM_API;
  constructor(public payload: number) {}
}



export type Actions =
  | LoadExcerpts
  | LoadingExcerptsSuccess
  | LoadingExcerptsFails
  | LoadProject
  | LoadingProjectSuccess
  | LoadingProjectFails
  | LoadAllProjects
  | LoadingAllProjectsSuccess
  | LoadingAllProjectsFails
  | SelectProject
  | SelectProjectFails
  | SelectProjectSuccess
  | SelectProjectFromApi
  | LoadComments
  | LoadingCommentsSuccess
  | LoadingCommentsFails;
