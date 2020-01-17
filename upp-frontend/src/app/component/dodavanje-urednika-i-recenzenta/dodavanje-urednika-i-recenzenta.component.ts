import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dodavanje-urednika-i-recenzenta',
  templateUrl: './dodavanje-urednika-i-recenzenta.component.html',
  styleUrls: ['./dodavanje-urednika-i-recenzenta.component.css']
})
export class DodavanjeUrednikaIRecenzentaComponent implements OnInit {

  processInstanceId: any;
  urednici: any;
  recenzenti: any;
  taskId: any;
  form: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('Dodavanje_urednika_i_recenzenta', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];

      this.userService.getUrednici().subscribe( urednici => {
        this.urednici = urednici;
      });
      this.userService.getRecenzenti().subscribe( recenzenti => {
        this.recenzenti = recenzenti;
      });
    });
  }

  odabir() {
    const formData = [];
    let urednik1Prazan, recenzent1Prazan;
    for (let i = 0; i < this.form.length; i++) {
      if (this.form[i]['id'] === 'urednik1' && this.form[i]['value']['value'] === null) {
        urednik1Prazan = true;
      } else if (this.form[i]['id'] === 'recenzent1' && this.form[i]['value']['value'] === null) {
      recenzent1Prazan = true;
      }

      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }

    if (urednik1Prazan) {
      this.toastr.warningToastr('Obavezan je odabir bar jednog urednika', 'Odaberite urednika!');
    } else if (recenzent1Prazan) {
      this.toastr.warningToastr('Obavezan je odabir bar jednog recenzenta', 'Odaberite recenzenta!');
    } else {
      this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
        this.toastr.successToastr('Casopis je poslat na reviziju', 'Casopis na reviziji!');
        this.router.navigate(['pregled-podataka-casopisa/'.concat(this.processInstanceId)]);
      });
    }
  }

}
