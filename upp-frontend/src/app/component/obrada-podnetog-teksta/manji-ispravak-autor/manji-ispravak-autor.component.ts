import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';

@Component({
  selector: 'app-manji-ispravak-autor',
  templateUrl: './manji-ispravak-autor.component.html',
  styleUrls: ['./manji-ispravak-autor.component.css']
})
export class ManjiIspravakAutorComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('ispravak_rada_autor', this.processInstanceId).subscribe(ret => {
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
      this.toastr.successToastr('Revizija', 'Rad poslat na reviziju');
      this.router.navigate(['home']);
    }, error => {
      this.toastr.warningToastr('Greska', 'Vreme za ispravak rada je isteklo');
      this.router.navigate(['home']);
    });
  }

}
