import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }
  user: any;

  login(user: any) {

    return this.http.post('http://localhost:8080/user/login', user);
  }

  startTaskAndGetForm(processKey: string) {
    const userId = localStorage.getItem('loggedUser');
    return this.http.get('http://localhost:8080/process/start/'.concat(processKey).concat('/').concat(userId));
  }

  getRegisterForm(processInstanceId) {
    return this.http.get('http://localhost:8080/process/get/Registracija/'.concat(processInstanceId));
  }

  getScientificAreasForm(processInstanceId: any) {
    return this.http.get('http://localhost:8080/process/get/9c3c9930-37d5-11ea-9cd9-1065305e317a/'.concat(processInstanceId));
  }

  submitTaskForm(processInstanceId: any, formData: any) {
    const userId = localStorage.getItem('loggedUser');
    return this.http.post('http://localhost:8080/process/post/'.concat(processInstanceId).concat('/').concat(userId), formData);
  }

  getActiveTask(processInstanceId: any) {
    return this.http.get('http://localhost:8080/process/get-active/'.concat(processInstanceId));
  }

  getForm(taskKey: any, processInstanceId: any) {
    return this.http.get('http://localhost:8080/process/get/'.concat(taskKey).concat('/').concat(processInstanceId));
  }

  getAssignedTasks(userId: any) {
    return this.http.get('http://localhost:8080/process/get-assigned-tasks/'.concat(userId));
  }

  getUrednici() {
    return this.http.get('http://localhost:8080/process/editor');
  }

  getRecenzenti() {
    return this.http.get('http://localhost:8080/process/reviewer');
  }
}
