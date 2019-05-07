import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators/';

import { AuthenticationService } from '../authentication/authentication.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private username = '';
  private password = '';
  public error = '';

  constructor(private router: Router, private authService: AuthenticationService) { }

  onSubmit() {
    this.authService.login(this.username, this.password).pipe(first()).subscribe(adminData => {
        if (adminData instanceof Error) {
          console.log(adminData);
          this.error = adminData.message;
        } else {
          this.router.navigate(['user']);
          this.error = '';
        }
      }
    );
  }

}
