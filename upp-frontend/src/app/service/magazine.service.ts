import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  constructor(private router: Router, private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:8080/magazine');
  }
}
