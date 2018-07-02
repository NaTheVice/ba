import {Merchant} from './merchant';
export interface Excerpt {

    id: number;
    title: string;
    summary: string;
    url: string;
    photo_small: string;
    merchant: Merchant;
    left_days: string;
    funded_percent: string;
    funded_current_value: string;
    next_goal: string;
    county: string;
    city: string;
    slug: string;

}
export interface ExcerptsList extends Array<Excerpt> {}
