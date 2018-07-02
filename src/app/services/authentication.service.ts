import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service'
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import * as jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    _isLoggedIn: BehaviorSubject<boolean>;
    constructor(private http: HttpClient, private userService: UserService) {
        console.log("[Authentication Service]")
        this._isLoggedIn = new BehaviorSubject<boolean>(false);
        this.isAuthenticated();

    }

    

    login(username: string, password: string): Observable<any> {
        return this.http.post<User>('http://sandbox.ecocrowd.de/wp-json/jwt-auth/v1/token', { username: username, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                    this._isLoggedIn.next(true)
                    this.userService.setCurrentUser();
                }
            }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this._isLoggedIn.next(false);
    }

    signUp(user: User): Observable<any> {
        return this.http.post<User>('http://sandbox.ecocrowd.de/gbs/api.json/register', { user: user.name, pwd: user.password, email: user.email });
    }

    getToken() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            return false;
        }
        return currentUser.token;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        console.log("token expiration: ", date);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }


    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        if (token && !this.isTokenExpired()) {
            this._isLoggedIn.next(true)
            return true;
        }
        this._isLoggedIn.next(false)
        return false;
    }

    isLoggedIn(): Observable<boolean> {
        return this._isLoggedIn.asObservable();
    }

}

