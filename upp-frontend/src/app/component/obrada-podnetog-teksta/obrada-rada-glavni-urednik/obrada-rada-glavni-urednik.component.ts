import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';

@Component({
  selector: 'app-obrada-rada-glavni-urednik',
  templateUrl: './obrada-rada-glavni-urednik.component.html',
  styleUrls: ['./obrada-rada-glavni-urednik.component.css']
})
export class ObradaRadaGlavniUrednikComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router,
              private magazineService: MagazineService) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('obrada_rada', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];
    });
  }

  potvrda() {
    let relevantan;
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
      if (this.form[i]['id'] === 'relevantan') {
        if (this.form[i]['value']['value'] === true) {
          relevantan = true;
        } else {
          relevantan = false;
        }
      }
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      if (relevantan) {
        this.toastr.successToastr('Pregled PDF-a', 'Rad poslat na pregled PDF-a');
        this.router.navigate(['pregled-pdf/'.concat(this.processInstanceId)]);
      } else {
        this.toastr.warningToastr('Rad nije relevantan', 'Rad je odbijen jer nije relevantan');
        this.router.navigate(['home']);
      }
    });
  }

}
