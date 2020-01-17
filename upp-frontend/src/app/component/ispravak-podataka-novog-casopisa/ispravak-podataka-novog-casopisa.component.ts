import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-ispravak-podataka-novog-casopisa',
  templateUrl: './ispravak-podataka-novog-casopisa.component.html',
  styleUrls: ['./ispravak-podataka-novog-casopisa.component.css']
})
export class IspravakPodatakaNovogCasopisaComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  naciniPlacanja: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('Ispravak_podataka', this.processInstanceId).subscribe(ret => {
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

  potvrda() {
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      this.userService.getActiveTask(this.processInstanceId).subscribe( value => {
        console.log(value);
        if (value['activeTaskKey'] === 'Pregled_podataka') {
          this.toastr.warningToastr('Casopis je poslat na ponovni pregled', 'Casopis na pregledu!');
          this.router.navigate(['pregled-podataka-casopisa/'.concat(value['processInstanceId'])]);
        } else {
          this.toastr.successToastr('Casopis je uspesno kreiran', 'Kreiran casopis!');
          this.router.navigate(['home/'.concat(value['processInstanceId'])]);
        }
      });

    });
  }

}
