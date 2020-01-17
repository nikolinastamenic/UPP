import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: [];
  constructor(private router: Router,  public toastr: ToastrManager, private userService: UserService, private route: ActivatedRoute) {  }

  ngOnInit() {

    const startProcess = this.route.snapshot.paramMap.get('startProcess');

    if (startProcess !== 'true') {    // ili sadrzi vrednost true(pokretanje procesa) ili id trenutnog procesa
      this.userService.getRegisterForm(startProcess).subscribe(ret => {
        this.processInstanceId = startProcess;
        this.taskId = ret['taskId'];
        this.form = ret['formFields'];
        // @ts-ignore
        this.formValue = this.form[0];
        // @ts-ignore
        this.naucneOblasti = Object.entries(this.form[0].type.values).sort((a, b) => b[0].localeCompare(a[0]));
      });
    } else {

      this.userService.startTaskAndGetForm('Registracija_korisnika').subscribe(ret => {
        this.taskId = ret['taskId']
        this.form = ret['formFields'];
        this.processInstanceId = ret['processInstanceId'];
      });
    }
  }

  register() {
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      this.router.navigate(['scientific-areas/'.concat(this.processInstanceId)]);

    });
  }

}
