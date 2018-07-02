import {Merchant} from './merchant';
import {Pledges} from './pledges';
export interface Project {

    id: number;
    merchant: Merchant;
    title: string;
    photo: string;
    goal_info: string;
    number_of_purchases: number;
    funded_current_value: number;
    left_days: string;
    sustain: Array<number>;
    summary: string;
    post_content: string;
    forwhat_money: string;
    why_ecocrowd: string;
    whoami: string;
    future2: string;
    goals: Array<Goal>;
    slug: string;
    city: string;
    country: string;
    expiration_date: string;
    post_date: string;
    exp_date_gmt: string;
    attributes: Array<Pledges>;
    next_goal: string;
}

export interface Goal {
    amount: number;
    amount_step: number;
    description: number;

}


export interface ProjectsList extends Array<Project> {}
export interface ApolloProjects { projectList: ProjectsList; }
export interface ApolloAllProjects { allProjects: ProjectsList; }
export interface ApolloProject { project: Project; }

