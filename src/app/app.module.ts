import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { ExcerptsComponent } from './components/excerpts/excerpts.component';
import { WhoisComponent } from './components/whois/whois.component';
import { SuccessProjectsComponent } from './components/success-projects/success-projects.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectInfoComponent } from './components/project/project-info/project-info.component';

import { ProjectsService} from './services/projects.service';
import { AuthenticationService} from './services/authentication.service';
import { WorkerService} from './services/worker.service';
import { AuthguardService} from './services/authguard.service';

import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer} from './store/ecocrowd-reducer';
import { EcocrowdEffects } from './store/ecocrowd-effects';
import { StartpageComponent } from './pages/startpage/startpage.component';
import { routerReducer, StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import {CustomSerializer} from './store/router-reducer';

import { ProjectInfoSecondaryComponent } from './components/project/project-info/project-info-secondary/project-info-secondary.component';
import { ProjectCommentsComponent } from './components/project/project-comments/project-comments.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectManagementComponent } from './components/project/project-management/project-management.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthErrorHandler } from './helpers/auth-error-handler';
import { AuthInterceptor } from './helpers/auth-requests';


import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    ExcerptsComponent,
    SuccessProjectsComponent,
    SponsorsComponent,
    FooterComponent,
    ProjectComponent,
    ProjectInfoComponent,
    WhoisComponent,
    StartpageComponent,
    ProjectInfoSecondaryComponent,
    ProjectManagementComponent,
    LoginComponent,
    LoginpageComponent,
    ProjectCommentsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    StoreModule.forRoot({
      ecocrowd: reducer,
      router: routerReducer,
    }),
    EffectsModule.forRoot([EcocrowdEffects]),
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'willkommen',
        component: StartpageComponent
      },
      {
        path: 'login',
        component: LoginpageComponent
      },
      {
        path: 'registrieren',
        component: RegisterComponent
      },
      {
        path: 'management',
        component: ProjectManagementComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 'projekt/:id/:slug',
        component: ProjectComponent
      },
      {
        path: '**',
        redirectTo: 'willkommen',
        pathMatch: 'full'
      }
    ]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ProjectsService,WorkerService, AuthguardService, {provide: RouterStateSerializer, useClass: CustomSerializer}, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}],
  bootstrap: [AppComponent]
})


export class AppModule {}
