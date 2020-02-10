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

  savePDF(file) {
    const f = new FormData();
    f.append('file', file);
    return this.http.post('http://localhost:8080/magazine/pdf', f);

  }

  getPDF(filename: string) {
    return this.http.get('http://localhost:8080/magazine/pdf/'.concat(filename), {responseType: 'blob'});
  }
}
