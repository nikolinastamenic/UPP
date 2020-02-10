import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-aktivna-clanarina',
  templateUrl: './aktivna-clanarina.component.html',
  styleUrls: ['./aktivna-clanarina.component.css']
})
export class AktivnaClanarinaComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('Aktivna_clanarina_autora', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];
    });
  }

  potvrda() {
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      if (this.form[0]['value']['value'] === true) {
        this.router.navigate(['informacije-o-radu/'.concat(this.processInstanceId)]);
      } else {
        this.router.navigate(['uplata-clanarine/'.concat(this.processInstanceId)]);
      }
    });
  }

}
