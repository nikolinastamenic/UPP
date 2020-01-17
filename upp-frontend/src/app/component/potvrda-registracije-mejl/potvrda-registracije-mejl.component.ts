import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-potvrda-registracije-mejl',
  templateUrl: './potvrda-registracije-mejl.component.html',
  styleUrls: ['./potvrda-registracije-mejl.component.css']
})
export class PotvrdaRegistracijeMejlComponent implements OnInit {

  processInstanceId: any;
  form: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrManager) { }

  ngOnInit() {
    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');
    this.userService.getForm('Potvrda_prijave', this.processInstanceId).subscribe( ret => {
      this.form = ret['formFields'];
    });
  }

  potvrda() {
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: true});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      this.userService.getActiveTask(this.processInstanceId).subscribe( value => {
        if (value['activeTaskKey'] === 'Potvrda_recenzenta') {
          this.toastr.warningToastr('Ceka se odobrenje za ulogu recenzenta', 'Cekanje odobrenja uloge')
          this.router.navigate(['/home']);

          // this.router.navigate(['potvrda_recenzenta/'.concat(value['processInstanceId'])]);
        } else {
          this.toastr.successToastr('Uspesno ste se registrovali na sistem!', 'Uspesna registracija');
          this.router.navigate(['home']);
        }
      })

     // this.router.navigate(['scientific-areas/'.concat(this.taskId).concat('/').concat(this.processInstanceId)]);

    });
  }

}
