import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userRole: any;
  user: any;
  constructor( private router: Router) { }


  ngOnInit() {
    // this.userRole = this.userService.getLoggedUserType();
    const userTemp = JSON.parse(localStorage.getItem('loggedUser'));
    if (userTemp !== null) {
      // this.userService.getUserByEmail(userTemp.sub).subscribe(user => {
      //   this.user = user;
      // });
    }
  }

  logout() {
    localStorage.clear();
    this.userRole = '';
    this.router.navigate(['/login']);
  }

}

