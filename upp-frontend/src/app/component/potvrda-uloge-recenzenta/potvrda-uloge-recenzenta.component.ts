import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-potvrda-uloge-recenzenta',
  templateUrl: './potvrda-uloge-recenzenta.component.html',
  styleUrls: ['./potvrda-uloge-recenzenta.component.css']
})
export class PotvrdaUlogeRecenzentaComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router) {
  }

  ngOnInit() {
    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');
    this.userService.getForm('Potvrda_recenzenta', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      // @ts-ignore
      this.formValue = this.form[0];
      // @ts-ignore
      this.naucneOblasti = Object.entries(this.form[0].type.values).sort((a, b) => b[0].localeCompare(a[0]));
    });
  }

  odobri() {
    const formSubmitValue = [];
    // @ts-ignore
    formSubmitValue.push({fieldId: this.form[0]['id'], fieldValue: true});
    this.userService.submitTaskForm(this.processInstanceId, formSubmitValue).subscribe(ret => {
      this.toastr.successToastr('Recenzent je uspesno kreiran', 'Kreiran recenzent');
      this.router.navigate(['/home']);
    });
  }

  otkazi() {
    const formSubmitValue = [];
    // @ts-ignore
    formSubmitValue.push({fieldId: this.form[0]['id'], fieldValue: false});
    this.userService.submitTaskForm(this.processInstanceId, formSubmitValue).subscribe(ret => {
      this.toastr.warningToastr('Otkazano je kreiranje recenzenta', 'Recenzent je odbijen');
      this.router.navigate(['/home']);
    });
  }
}

