import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-odabir-naucnih-oblasti',
  templateUrl: './odabir-naucnih-oblasti.component.html',
  styleUrls: ['./odabir-naucnih-oblasti.component.css']
})
export class OdabirNaucnihOblastiComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: [];
  formValue: any;
  naucneOblasti: [];

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private toastr: ToastrManager) {
  }

  ngOnInit() {
    // this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');
    this.userService.getScientificAreasForm(this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      // @ts-ignore
      this.formValue = this.form[0];
      // @ts-ignore
      this.naucneOblasti = Object.entries(this.form[0].type.values).sort((a, b) => b[0].localeCompare(a[0]));
    });
  }

  submit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');
    const formSubmitValue = [];
    // @ts-ignore
    formSubmitValue.push({fieldId: this.form[0]['id'], fieldValue: this.form[0]['value']['value']});
    this.userService.submitTaskForm(this.processInstanceId, formSubmitValue).subscribe(ret => {
      this.userService.getActiveTask(this.processInstanceId).subscribe( value => {
        console.log(value);
        if (value['activeTaskKey'] === 'Odabir_naucne_oblasti') {
          this.router.navigate(['scientific-areas/'.concat(value['taskId']).concat('/').concat(value['processInstanceId'])]);
        } else if (value['activeTaskKey'] === 'Registracija') {
          this.toastr.warningToastr('Poslat je mejl zbog nevalidnosti podataka', 'Podaci nisu validni');
          this.router.navigate(['register/'.concat(value['processInstanceId'])]);
        } else if (value['activeTaskKey'] === 'Potvrda_prijave') {
         // this.router.navigate(['scientific-areas/'.concat(value['taskId']).concat('/').concat(value['processInstanceId'])]);
          this.toastr.successToastr('Poslat je mejl za potvrdu registracije', 'Poslat mejl');
          this.router.navigate(['/home']);
        } else if (value['activeTaskKey'] === 'Dodavanje_urednika_i_recenzenta') {
          this.router.navigate(['dodavanje-urednika-i-recenzenata/'.concat(value['processInstanceId'])]);
        }
      });
    });

  }

}
