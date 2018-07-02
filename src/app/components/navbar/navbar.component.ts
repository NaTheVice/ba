import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  openmenu: boolean;
  isLoggedIn: boolean;
  constructor( private authenticationService: AuthenticationService) { 
    this.openmenu = false; 
    authenticationService.isLoggedIn().subscribe(value => this.isLoggedIn = value);
  }

  ngOnInit() {
  }

}
