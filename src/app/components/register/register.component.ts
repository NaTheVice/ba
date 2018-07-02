import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,  private router: Router, public toastr: ToastrService) { 

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
        this.authenticationService.signUp(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.toastr.success('Registrierung erfolgreich :)', 'Super!');
                    this.router.navigate(['/login']);
                },
                error => {
                  this.toastr.error('Registrierung nicht möglich', 'Oops!');
                  console.log(error)
                  this.loading = false;
                });
  }
}
