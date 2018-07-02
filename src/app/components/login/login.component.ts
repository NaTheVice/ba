import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  isLoggedIn : boolean;
  user: User;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      public toastr: ToastrService) {
        this.user = new User;
        authenticationService.isLoggedIn().subscribe(value => {
            
            this.isLoggedIn = value;
            if(value ===true)
            this.userinfo();
        });
      }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // reset login status
      //this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  this.toastr.success(`Willkommen ${this.f.username.value} :)`, 'Eingeloggt!');
              },
              error => {
                this.toastr.error('Login fehlgeschlagen :(!', 'try again');
                  this.error = "Benutzername und/oder Passwort sind falsch.";
                  this.loading = false;
              });
  }

  public logout(){
      this.authenticationService.logout();
      this.router.navigate(['/willkommen']);
      this.toastr.success(`Bis bald... :)`, 'Ausgeloggt!');
  }

  public userinfo(){
      this.user = this.userService.getCurrentUser();
  }
}
