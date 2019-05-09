import { AuthenticationService } from '../authentication/authentication.component';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
              private router: Router,
              private authService: AuthenticationService) {}


  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  checkAuthorized() {
    const checkUser = this.authService.currentUserValue;
    if (checkUser) {
      return true;
    }
  }
}
