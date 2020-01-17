import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const userId = localStorage.getItem('loggedUser');
    this.userService.getAssignedTasks(userId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  redirectToTask(task: any) {

    if (task['taskKey'] === 'Odabir_naucne_oblasti') {
      this.router.navigate(['scientific-areas/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Potvrda_recenzenta') {
      this.router.navigate(['potvrda_recenzenta/'.concat(task['processInstanceId'])]);
    }
  }

}
