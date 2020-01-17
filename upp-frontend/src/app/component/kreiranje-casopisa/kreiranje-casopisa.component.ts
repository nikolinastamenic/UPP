import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-kreiranje-casopisa',
  templateUrl: './kreiranje-casopisa.component.html',
  styleUrls: ['./kreiranje-casopisa.component.css']
})
export class KreiranjeCasopisaComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  naciniPlacanja: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private toastr: ToastrManager) { }

  ngOnInit() {
    this.userService.startTaskAndGetForm('Kreiranje_novog_casopisa').subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];

      for (let i = 0; i < this.form.length; i++) {
        if (this.form[i]['type']['name'] === 'enum') {
          // @ts-ignore
          this.naciniPlacanja = Object.entries(this.form[i].type.values).sort((a, b) => b[0].localeCompare(a[0]));

        }
      }
    });
  }

  create() {
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      this.router.navigate(['scientific-areas/'.concat(this.processInstanceId)]);

    });
  }

}
