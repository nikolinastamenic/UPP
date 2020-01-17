import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-pregled-podataka-novog-casopisa',
  templateUrl: './pregled-podataka-novog-casopisa.component.html',
  styleUrls: ['./pregled-podataka-novog-casopisa.component.css']
})
export class PregledPodatakaNovogCasopisaComponent implements OnInit {


  processInstanceId: any;
  taskId: any;
  form: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('Pregled_podataka', this.processInstanceId).subscribe(ret => {
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
      this.userService.getActiveTask(this.processInstanceId).subscribe( value => {
        console.log(value);
        if (value === null) {
          this.toastr.successToastr('Casopis je uspesno kreiran', 'Kreiran casopis!');
          this.router.navigate(['/home']);
        } else if (value['activeTaskKey'] === 'Ispravak_podataka') {
          this.toastr.warningToastr('Casopis je poslat na ispravku', 'Casopis na ispravci!');
          this.router.navigate(['ispravak-podataka-casopisa/'.concat(value['processInstanceId'])]);
        }
      });

    });
  }
}
