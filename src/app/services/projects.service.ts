import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

import {ExcerptsList} from '../models/excerpts';
import { CommentsList } from '../models/comments';
import {ApolloProject, ApolloAllProjects, ProjectsList, Project} from '../models/projects';

import { Observable ,  defer ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import * as ecocrowdReducers from '../store/ecocrowd-reducer';
import { map, switchMap, catchError } from "rxjs/operators";


@Injectable()
export class ProjectsService {
api = ""
  constructor( 
    private httpClient: HttpClient,
    private store: Store<ecocrowdReducers.State>) { 

      if(!environment.production){
        this.api = "http://localhost:8070"
      }
    }


    public getExcerpts(max: number) : Observable<any>{
      return this.httpClient.get<any>(`${this.api}/graphql/?query={
        excerptsList(max: ${max}) {
            id
            summary
            photo_small
            title
            left_days
            funded_percent
            funded_current_value
            next_goal
            url
            country
            city
            slug
            merchant {
              id
              url
              title
            }
        }
      }`);
    }

    /* public getExcerpts(max){
      return this.httpClient.get<ExcerptsList>(`https://www.ecocrowd.de/gbs/api.json/deals?max=${max}`);
    } */

    public getProjectsOfExerpts(excerptsList: ExcerptsList){
      console.log("excerpts in service: ", excerptsList);
      const newProjectsArray: ProjectsList = [];
      excerptsList.map(excerpt => { 
        this.getProject(excerpt.id).subscribe(({data}) => {
          newProjectsArray.push(data.project);
        });
      });
      console.log("newProjectArray: ", newProjectsArray)
      return of(newProjectsArray);
    }

    public getProjectFromProjectsList(projectId: number){
      let selectedProject: Project;
      this.store.select(ecocrowdReducers.getAllProjectsState).subscribe((allProjectsFromStore) => {
        console.log("allProjectsFromStrore: ", allProjectsFromStore)
          if (allProjectsFromStore ){
            allProjectsFromStore.map((project: Project) => {
              if(project.id == projectId)
              selectedProject = project;
              return
            });
          return
          } 
      });
      return of(selectedProject);
    }

    public getAllProjects() {

      return this.httpClient.get<any>(`${this.api}/graphql/?query={
        allProjects {
          id
          merchant {
            id
            url
            title
            contact_city
            contact_country
            avatar
          }
          title
          slug
          photo
          goal_info
          number_of_purchases
          funded_current_value
          left_days
          sustain
          summary
          post_content
          forwhat_money
          goals{
            amount
            amount_step
            description
          }
          why_ecocrowd
          whoami
          future2
          country
          city
          expiration_date
          exp_date_gmt
          post_date
          next_goal
          attributes{
            id
            title
            description
            max_purchases
            remaining_purchases
            price
            shipment_date_month
            shipment_date_year
          }
        }
      }`);
      
    }

   public getProject(id: number) {
    return this.httpClient.get<any>(`${this.api}/graphql/?query={
            project(id: ${id}) {
              id
              merchant {
                id
                url
                title
                contact_city
                contact_country
                avatar
              }
              title
              slug
              photo
              goal_info
              number_of_purchases
              funded_current_value
              left_days
              sustain
              summary
              post_content
              forwhat_money
              goals{
                amount
                amount_step
                description
              }
              why_ecocrowd
              whoami
              future2
              country
              city
              expiration_date
              post_date
              exp_date_gmt
              next_goal
              attributes{
                id
                title
                description
                max_purchases
                remaining_purchases
                price
                shipment_date_month
                shipment_date_year
              }
            }
          }`)

    }

    public getProjectComments(id: number){
      console.log("load comments for:", id)
      return this.httpClient.get<CommentsList>(`http://sandbox.ecocrowd.de/wp-json/wp/v2/comments?post=${id}`);
    }
  
/* 
public getProject(id){
  return this.httpClient.get<Project>(`http://sandbox.ecocrowd.de/gbs/api.json/deal/${id}`);
} */


}
