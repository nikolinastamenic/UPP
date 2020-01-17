import { Component, OnInit } from '@angular/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  token: any;
  wrongUsernameOrPass: boolean;

  constructor(private router: Router, public toastr: ToastrManager, private userService: UserService) {
  }
  ngOnInit() {
    this.user = {username: '', password: ''};
    this.token = {accessToken: '', expiresIn: ''};
  }

  login() {

    this.wrongUsernameOrPass = false;
    const headers = new Headers();
    this.userService.login(this.user).subscribe(value => {

      localStorage.setItem('loggedUser', this.user.username);
      localStorage.setItem('userRole', value['role']);
      this.router.navigate(['home']);
      // @ts-ignore
      location.replace(['home']);
      this.user = {username: 'username', role: 'admin'};
      return this.user;

    }, error2 => {
      console.log(error2);
      this.wrongUsernameOrPass = true;
      this.toastr.errorToastr('Invalid username or password!', 'Error');
    });
  }

}

