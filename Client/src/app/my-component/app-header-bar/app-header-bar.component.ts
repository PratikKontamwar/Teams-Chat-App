import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-header-bar',
  templateUrl: './app-header-bar.component.html',
  styleUrls: ['./app-header-bar.component.css']
})
export class AppHeaderBarComponent implements OnInit {

  constructor(
    private cookies: CookieService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // Using Local Storage
  isLogin: boolean = JSON.parse(localStorage.getItem('isLogin'));
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');

  onLogout() {
    // Using Local Storage
    localStorage.clear();
    this.isLogin = false;
    localStorage.setItem('isLogin', JSON.stringify(this.isLogin));

    // Using Cookies
    this.cookies.deleteAll()
    this.isLogin = false;
    this.cookies.set('isLogin', JSON.stringify(this.isLogin));
    this.router.navigate(['/']); // navigate to home
  }

}
