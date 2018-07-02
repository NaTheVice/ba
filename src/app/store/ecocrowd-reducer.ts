import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Excerpt, ExcerptsList } from '../models/excerpts';
import { Project, ProjectsList } from '../models/projects';
import { Merchant } from '../models/merchant';
import * as ecocrowdActions from './ecocrowd-actions';
import {getRouterState} from './router-reducer';
import { CommentsList } from '../models/comments';


const merchantTemplate: Merchant = {
  id: 0,
  url: '',
  title: '',
  contact_city: '',
  contact_country: '',
  avatar: ''
};

const excerptTemplate: Excerpt = {
    id: 0,
    title: '',
    summary: '',
    url: '',
    photo_small: '',
    merchant: merchantTemplate,
    left_days: '',
    funded_percent: '',
    funded_current_value: '',
    next_goal: '',
    county: '',
    city: '',
    slug: ''
};

export interface State {
  excerptsLoaded: boolean;
  excerptsLoading: boolean;
  excerpts: ExcerptsList;

  projectLoaded: boolean;
  projectLoading: boolean;
  project: Project;

  allProjectsLoaded: boolean;
  allProjectsLoading: boolean;
  allProjects: ProjectsList;

  projectSelecting: boolean;
  projectSelected: boolean;
  selectedProject: Project;

  commentsLoaded: boolean;
  commentsLoading: boolean;
  comments: CommentsList;

}

const initialState: State = {
  excerptsLoaded: false,
  excerptsLoading: false,
  excerpts: new Array(15).fill(excerptTemplate),

  projectLoaded: false,
  projectLoading: false,
  project: null,

  allProjectsLoaded: false,
  allProjectsLoading: false,
  allProjects: null,

  projectSelecting: false,
  projectSelected: false,
  selectedProject: null,

  commentsLoaded: false,
  commentsLoading: false,
  comments: null
};



export function reducer(state = initialState, action: ecocrowdActions.Actions): State {
  switch (action.type) {

    case ecocrowdActions.LOAD_EXCERPTS: {
      console.log("reducer load");
        return {
          ...state,
          excerptsLoading: true
        };
      }

    case ecocrowdActions.LOADING_EXCERPTS_SUCCESS: {
      return {
        ...state,
        excerptsLoaded: true,
        excerptsLoading: false,
        excerpts: [...action.payload]
      };
    }

    case ecocrowdActions.LOADING_EXCERPTS_FAILS: {
      return {
        ...state,
        excerptsLoaded: false,
        excerptsLoading: false
      };
    }




  case ecocrowdActions.LOAD_PROJECT: {
      return {
        ...state,
        projectLoading: true
      };
    }

  case ecocrowdActions.LOADING_PROJECT_SUCCESS: {
    return {
      ...state,
      projectLoaded: true,
      projectLoading: false,
      project: action.payload
    };
  }

  case ecocrowdActions.LOADING_PROJECT_FAILS: {
    return {
      ...state,
      projectLoaded: false,
      projectLoading: false
    };
  }








  case ecocrowdActions.LOAD_COMMENTS: {
    return {
      ...state,
      commentsLoading: true
    };
  }

case ecocrowdActions.LOADING_COMMENTS_SUCCESS: {
  return {
    ...state,
    commentsLoaded: true,
    commentsLoading: false,
    comments: action.payload
  };
}

case ecocrowdActions.LOADING_COMMENTS_FAILS: {
  return {
    ...state,
    commentsLoaded: false,
    commentsLoading: false
  };
}









case ecocrowdActions.LOAD_ALL_PROJECTS: {
    return {
      ...state,
      allProjectsLoading: true
    };
  }

case ecocrowdActions.LOADING_ALL_PROJECTS_SUCCESS: {
  return {
    ...state,
    allProjectsLoaded: true,
    allProjectsLoading: false,
    allProjects: action.payload
  };
}

case ecocrowdActions.LOADING_ALL_PROJECTS_FAILS: {
  return {
    ...state,
    allProjectsLoaded: false,
    allProjectsLoading: false
  };
}



case ecocrowdActions.SELECT_PROJECT_FROM_API: {
  return {
    ...state,
    projectSelecting: true
  };
}


case ecocrowdActions.SELECT_PROJECT_FAILS: {
  return {
    ...state,
    projectSelecting: false,
    projectSelected: false
  };
}

case ecocrowdActions.SELECT_PROJECT_SUCCESS: {
  return {
    ...state,
    projectSelecting: false,
    projectSelected: true,
    selectedProject: action.payload
  };
}



case ecocrowdActions.SELECT_PROJECT: {

  return {
    ...state,
    projectSelecting: true
  };
}

    default: {
      return state;
    }
  }
}

export const getEcocrowdState = createFeatureSelector<State>('ecocrowd');
export const getExcerptsListState = createSelector(
  getEcocrowdState,
  (state: State) => state.excerpts
);
export const getExcerptsLoading = createSelector(
    getEcocrowdState,
    (state: State) => state.excerptsLoading
  );


  export const getProjectLoading = createSelector(
    getEcocrowdState,
    (state: State) => state.projectLoading
  );
  export const getProjectState = createSelector(
    getEcocrowdState,
    (state: State) => state.project
  );


  export const getAllProjectsLoading = createSelector(
    getEcocrowdState,
    (state: State) => state.allProjectsLoading
  );
  export const getAllProjectsState = createSelector(
    getEcocrowdState,
    (state: State) => state.allProjects
  );

  export const getSelectedProjectState = createSelector(
    getEcocrowdState,
    (state: State) => state.selectedProject
  );

  export const getSelectedProject = createSelector(
    getEcocrowdState,
    getRouterState,
    (state: State, router) => {
      return router.state && state.allProjects.find(project => project.id === router.state.params.id);
    }
  );

  export const getProjectSelecting = createSelector(
    getEcocrowdState,
    (state: State) => state.projectSelecting
  );





  export const getCommentsState = createSelector(
    getEcocrowdState,
    (state: State) => state.comments
  );
  export const getCommentsLoading = createSelector(
    getEcocrowdState,
    (state: State) => state.commentsLoading
  );
