import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-guard/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.error);
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => {
        console.log("navigating");
        this.router.navigate(['list']);
      },
      error => {
        this.error = error;
      }
    );
  }

}